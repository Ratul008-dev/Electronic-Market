import React from 'react'
import { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import {sendCartToBackend} from '../utils/cartService'
import './Gadget.css'
import { useNavigate } from 'react-router-dom'
const Gadget = () => {
    const [gadgetdata, setGadgetdata] = useState([])
    const [activeImage, setActiveImage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetch("./Gadget.json")
            .then(res => res.json())
            .then(data => setGadgetdata(data))
            .catch(err => console.log(err))
    }, [])
    const addToCart = (item) => {
        const token=localStorage.getItem("token")
        if(!token){
            toast.error("Please Log In first...")
            navigate("/Login")
            return;
        }
        let cart=JSON.parse(localStorage.getItem("cart"))||[]
        cart.push({...item,quantity:1});
        localStorage.setItem("cart",JSON.stringify(cart));
        sendCartToBackend(cart)
        toast.success("Item added to cart!")
    }
    return (
        <div className="Gadget-list">
            {gadgetdata.map((item) => (
                <div className="Gadget-card" key={item.id}>
                    <div className="Gadget-image">
                        <img
                            src={item.image1}
                            alt={item.name}
                            onClick={() => setActiveImage({ src: item.image1, alt: item.name })}
                        />
                        <img
                            src={item.image2}
                            alt={item.name}
                            onClick={() => setActiveImage({ src: item.image2, alt: item.name })}
                        />
                        <img
                            src={item.image3}
                            alt={item.name}
                            onClick={() => setActiveImage({ src: item.image3, alt: item.name })}
                        />
                    </div>
                    <div className="Gadget-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                        <p>{item.type}</p>
                        <p>{item.connectivity}</p>
                        <button onClick={() => addToCart(item)}>
                            Add To Cart
                        </button>
                    </div>

                </div>
            ))}
            {activeImage && (
                <div className="Image-overlay" onClick={() => setActiveImage(null)}>
                    <div className="Image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={activeImage.src} alt={activeImage.alt} />
                        <button className="Close-button" onClick={() => setActiveImage(null)}>&times;</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gadget