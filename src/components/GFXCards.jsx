import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {sendCartToBackend} from '../utils/cartService'
import './GFXCards.css'

const GFXCards = () => {
    const [gfxCardsdata, setGFXCardsdata] = useState([])
    const [activeImage, setActiveImage] = useState(null)
    const navigate=useNavigate()
    useEffect(() => {
        fetch('./GFXCards.json')
            .then(res => res.json())
            .then(data => setGFXCardsdata(data))
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
        <div className="GFXCards-list">
            {gfxCardsdata.map((item) => (
                <div className="GFXCards-card" key={item.id}>
                    <div className="GFXCards-image">
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
                    <div className="GFXCards-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                        <p>{item.type}</p>
                        <p>{item.memory}</p>
                        <p>{item.architecture}</p>
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

export default GFXCards