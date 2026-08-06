import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {sendCartToBackend} from '../utils/cartService'
import './Motherboards.css'
const Motherboards = () => {
    const [motherboardsdata, setMotherboardsdata] = useState([])
    const [activeImage, setActiveImage] = useState(null)
    const navigate=useNavigate()
    useEffect(() => {
        fetch('./Motherboards.json')
            .then(res => res.json())
            .then(data => setMotherboardsdata(data))
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
        <div className="Motherboards-list">
            {motherboardsdata.map((item) => (
                <div className="Motherboards-card" key={item.id}>
                    <div className="Motherboards-image">
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
                    <div className="Motherboards-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                        <p>{item.chipset}</p>
                        <p>{item.socket}</p>
                        <p>{item.memory}</p>
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

export default Motherboards