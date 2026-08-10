import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import {sendCartToBackend} from '../utils/cartService'
import './Monitors.css'

const Monitors = () => {
    const [monitorsData, setMonitorsData] = useState([]) // Renamed to lowercase to avoid conflict with component name
    const [activeImage, setActiveImage] = useState(null) // Tracks the clicked image object
    const navigate = useNavigate()

    useEffect(() => {
        fetch('/Monitors.json')
            .then(res => res.json())
            .then(data => setMonitorsData(data))
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
        <div className="Monitors-list">
            {monitorsData.map((item) => (
                <div className="Monitors-card" key={item.id}>
                    <div className="Monitors-image">
                        {/* Added click handlers to set the modal image details */}
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
                    <div className="Monitors-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                        <p>{item.size}</p>
                        <p>{item.refreshRate}</p>
                        <p>{item.resolution}</p>
                        <button onClick={() => addToCart(item)}>
                            Add To Cart
                        </button>
                    </div>

                </div>
            ))}

            {/* Click-to-Open Modal Viewer */}
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

export default Monitors
