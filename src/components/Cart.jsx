import React from 'react'
import { useState, useEffect } from 'react';
import './Cart.css'
const sendCartToBackend = async (cartData) => {
  
  const token = localStorage.getItem('token');

  await fetch('http://localhost:3000/cart', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(cartData)
  })
}
const Cart = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setProducts([]);
        return;
      }
      const res = await fetch("http://localhost:3000/cart", {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.json();
      setProducts(data.items || []);
      localStorage.setItem("cart",
        JSON.stringify(data.items || [])
      )
      
    }
    loadCart()

  }, [])

  const getProduct = (item) => {
    return products.find((product) => product.id === item.id)
  }
  const decrease = (item) => {
    const selectedProduct = getProduct(item);
    if (selectedProduct.quantity > 1) {
      selectedProduct.quantity -= 1
    }
    setProducts([...products]);
    localStorage.setItem("cart", JSON.stringify(products))
    sendCartToBackend(products)
  }

  const increase = (item) => {
    const selectedProduct = getProduct(item);
    selectedProduct.quantity += 1
    setProducts([...products]);
    localStorage.setItem("cart", JSON.stringify(products))
    sendCartToBackend(products)
  }

  const removeProduct = (item) => {
    const updatedProducts = products.filter((product) => {
      return product.id !== item.id;
    });
    setProducts(updatedProducts);
    localStorage.setItem("cart", JSON.stringify(updatedProducts));
    sendCartToBackend(updatedProducts);
  };

  const totalPrice = products.reduce((total, item) => {
    return total + item.price * (item.quantity || 1)
  }, 0)
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/payment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      });

      const order = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Electronic Market",
        description: "Order Payment",
        order_id: order.id,

        handler: function (response) {
          alert("Payment Successful");
          console.log(response);
        },

        theme: {
          color: "#f7d600"
        }
      };

      const razor = new window.Razorpay(options);
      razor.open();

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className='cart-list'>
        {products.map((item, index) => (
          <div className='cart' key={index}>
            <img src={item.image1} alt={item.name} />
            <h2>{item.name}</h2>
            <p>₹{item.price.toLocaleString('en-IN')}</p>
            <button onClick={() => decrease(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increase(item)}>+</button>
            <button onClick={() => removeProduct(item)}>Remove</button>

          </div>
        ))}
        <div className="notification">

          {totalPrice === 0 ? (
            <>
              <img src="image/cart.jpg" alt="shopping cart graphic with the word cart on a friendly blue background" />
              <h2 className='cart-noft'>Your Cart is Empty.</h2></>) :
            (<div>
              <h2 className='cart-total'>Total: ₹{totalPrice}</h2>

              <button
                className="pay-btn"
                onClick={handlePayment}
              >
                Pay Now
              </button>
            </div>)}
        </div>
      </div>

    </>
  )
}

export default Cart