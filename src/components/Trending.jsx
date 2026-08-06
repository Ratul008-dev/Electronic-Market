import React from 'react'
import { useEffect, useState } from 'react'
import './Trending.css'
import { Link } from 'react-router-dom'
const Trending = () => {
    const [Trending, setTrending] = useState([])
    useEffect(() => {
        fetch('/Trending.json')
            .then(res => res.json())
            .then(data => setTrending(data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        
     }, [Trending])
    return (
        <div className="Trending-grid">
            {Trending.map((item) => (
                <Link to={item.path} key={item.id} className='trending-link'>
                <div className="Trending-card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p>{item.rating}</p>
                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                  


                </div>
                </Link>
            ))}
        </div>
    )
}

export default Trending