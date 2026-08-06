import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {sendCartToBackend} from '../utils/cartService'
import './Audio.css'
const Audio = () => {
    const [audiodata, setAduiodata] = useState([])
    const [activeImage, setActiveImage] = useState(null)
    const navigate=useNavigate()
    useEffect(() => {
        fetch('./Audio.json')
            .then(res => res.json())
            .then(data => setAduiodata(data))
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
        <div className="Audio-list">
            {audiodata.map((item) => (
                <div className="Audio-card" key={item.id}>
                    <div className="Audio-image">
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
                    <div className="Audio-info">
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

export default Audio