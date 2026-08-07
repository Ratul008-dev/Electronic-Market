export const sendCartToBackend = async (cartData) => {
    const token = localStorage.getItem("token");

    await fetch("https://electronic-market.onrender.com/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(cartData)
    });
};