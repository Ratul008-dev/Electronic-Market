import fs from "fs/promises"
import path from "path"

const publicPath = path.join(process.cwd(), "public")
let products = [];
export async function loadProducts() {
    const files = await fs.readdir(publicPath)

    products = [];

    for (const file of files) {
        if (!file.endsWith(".json")) continue;
        const filePath = path.join(publicPath, file);
        const data = await fs.readFile(filePath, "utf-8");
        const json = JSON.parse(data);
        products.push(...json)
    }


    return products
}
export function getProducts() {
    return products;
}
export function searchProducts(prompt) {
    const products = getProducts();
    const query = prompt.toLowerCase();

    const categoryMap = {
        "gpu": "graphics card",
        "graphics": "graphics card",
        "graphics card": "graphics card",
        "graphic card": "graphics card",
        "vga": "graphics card",
        "rtx": "graphics card",
        "gtx": "graphics card",
        "radeon": "graphics card",

        "motherboard": "motherboard",
        "mobo": "motherboard",
        "mainboard": "motherboard",
        "board": "motherboard",

        "monitor": "monitor",
        "display": "monitor",
        "screen": "monitor",

        "phone": "phone",
        "mobile": "phone",
        "smartphone": "phone",
        "iphone": "phone",

        "camera": "camera",
        "dslr": "camera",
        "mirrorless": "camera",
        "webcam": "camera",

        "audio": "audio",
        "headphone": "audio",
        "headphones": "audio",
        "headset": "audio",
        "earphone": "audio",
        "earphones": "audio",
        "earbuds": "audio",
        "speaker": "audio",
        "speakers": "audio",
        "Soundbar":"audio",
        "soundbars":"audio",

        "accessory": "accessories",
        "accessories": "accessories",
        "keyboard": "accessories",
        "mouse": "accessories",
        "charger": "accessories",
        "adapter": "accessories",
        "gaming chair": "accessories"
    };

    const brandMap = {
        asus: "asus",
        msi: "msi",
        gigabyte: "gigabyte",
        amd: "amd",
        intel: "intel",
        nvidia: "nvidia",
        samsung: "samsung",
        apple: "apple",
        dell: "dell",
        lg: "lg",
        acer: "acer",
        hp: "hp",
        lenovo: "lenovo"
    };

    let results = [...products];

    // Category filter
    const categoryKey = Object.keys(categoryMap).find(key =>
        query.includes(key)
    );

    if (categoryKey) {
        results = results.filter(product =>
            JSON.stringify(product)
                .toLowerCase()
                .includes(categoryMap[categoryKey])
        );
    }

    // Brand filter
    const brandKey = Object.keys(brandMap).find(key =>
        query.includes(key)
    );

    if (brandKey) {
        results = results.filter(product =>
            JSON.stringify(product)
                .toLowerCase()
                .includes(brandMap[brandKey])
        );
    }

    // Cheapest / Budget
    if (
        query.includes("cheap") ||
        query.includes("cheapest") ||
        query.includes("budget")
    ) {
        results.sort((a, b) => a.price - b.price);
    }

    // Premium / Expensive
    if (
        query.includes("expensive") ||
        query.includes("premium") ||
        query.includes("flagship")
    ) {
        results.sort((a, b) => b.price - a.price);
    }

    // If nothing matched, do normal search
    if (results.length === products.length) {
        results = products.filter(product =>
            JSON.stringify(product)
                .toLowerCase()
                .includes(query)
        );
    }

    return results.slice(0, 5);
}