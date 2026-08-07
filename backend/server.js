import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from './models/User.js';
import Contact from './models/contact.js';
import Problem from './models/problem.js';
import Cart from './models/cart.js';
import jwt from 'jsonwebtoken';
import authenticateUser from './middleware/auth.js';
import ai from './gemini.js'
import dotenv from 'dotenv'
import { getProducts, loadProducts, searchProducts } from './services/productService.js';
import payment from "./payment.js"

dotenv.config();

const secretkey = process.env.JWT_SECRET
console.log(process.env.JWT_SECRET)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err);
    })

await loadProducts();
const products = getProducts()
console.log('Total Products:', products.length);
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.post('/contact', async (req, res) => {
    console.log('Review Form');
    console.log(req.body);
    res.status(200).json({ message: 'Contact form submission received' });
    const newContact = new Contact(req.body);
    await newContact.save();
});
app.post('/problem', async (req, res) => {
    console.log('Problem Form');
    console.log(req.body);
    res.status(200).json({ message: 'Problem form submission received' });
    const newProblem = new Problem(req.body);
    await newProblem.save();
});
app.post('/cart', authenticateUser, async (req, res) => {
    console.log("Post req.body:", req.body);
    console.log('Cart Updated');
    console.log(req.headers.authorization)
    console.log('Authenticated user:', req.user);
    console.log(req.body);
    const existingCart = await Cart.findOne({ userId: req.user.id });
    if (existingCart) {
        existingCart.items = req.body;
        await existingCart.save();
    } else {
        const newCart = new Cart({
            userId: req.user.id,
            items: req.body
        });
        await newCart.save();
    }
    console.log('Existing cart:', existingCart);
    res.json({
        message: 'Cart Received'
    });


});
app.get('/cart', authenticateUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.user.id
        });
        if (!cart) {
            return res.json({ items: [] })
        } res.json(cart);
    } catch (err) {
        res.status(500).json({
            message: "Error Fetching cart"
        });
    }
})

app.post('/register', async (req, res) => {
    try {
        const { username, email, number, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            number,
            password: hashedPassword
        });
        await newUser.save();
        console.log('User registered:', newUser);
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                username: user.username
            },
            secretkey, {
            expiresIn: "1h"
        }
        )
        console.log('Token generated:', token);
        console.log('User logged in:', user);
        res.status(200).json({ message: 'Login successful', token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post("/ai", async (req, res) => {
    try {
        const { prompt } = req.body;
        const products = searchProducts(prompt);
        console.log(products.length)
        console.log(`Loaded ${products.length}products for AI`);
        const systemPrompt = `
You are Electronic Market AI Assistant.

Your name is EM Assistant.

You help customers choose electronic products.

Your personality:
- Friendly
- Professional
- Helpful
- Honest

Rules:
- Recommend products only from the product list below.
- Never invent products that don't exist.
- If the requested product is not available, politely say it is not available.
- Use only the information provided below.
- Never use Markdown.
- Never use ** or ###.
- Never show product IDs.
- If suggesting multiple products, list them clearly.
- Format each product like:

If you recommend products, only explain why they are suitable.
Do NOT rewrite the product details because they will be displayed 
separetly by the website.

- Keep replies short and shopping-friendly.

Available Products:
${JSON.stringify(products)}
User Question:
${prompt}
`;
const aiProducts=products.map(product=>({
    ...product,
    link:`/Products/${product.id}`
}))
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: systemPrompt,
        });
        let cleanReply = response.text
            .replace(/\*\*/g, "")
            .replace(/###/g, "")
            .replace(/##/g, "")
            .replace(/#/g, "")
            .replace(/^\d+\.\s*/gm, "")
            .trim();
        console.log("Gemini Reply");
        console.log(response.text)
        res.json({
            reply: cleanReply,
            products: aiProducts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "AI Error"
        });
    }
});
app.use("/payment",payment);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});