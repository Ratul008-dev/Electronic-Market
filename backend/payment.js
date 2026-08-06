import express from "express";
import razorpay from "./razorpay.js";

const router = express.Router();
router.post("/create-order", async (req, res) => {
try{
    const options={
        amount:50000,
        currency:"INR",
        receipt:`receipt_${Date.now()}`
    };
    const order= await razorpay.orders.create(options);
    res.json(order)
}catch(error){
console.log(error);
res.status(500).json({
    message: "Failed to create order"
})
}
})
export default router;