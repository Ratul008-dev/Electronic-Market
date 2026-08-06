export const sendCartToBackend = async (cartData) => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(cartData)
    });
};