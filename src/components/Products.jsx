import React from 'react'
import './Products.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
const Products = () => {
    const [Products, setProducts] = useState([])
    useEffect(() => {
        fetch('./ProductCard.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        
    }, [Products])
    return (
        <>
        <div className="Products-grid">
            {Products.map((item) => (
                <Link to={item.path} key={item.id} className='product-link'>
                    <div className="Products-card" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>

                    </div>
                </Link>
            ))}
        </div>
        <Footer/>
        </>
    )
}

export default Products