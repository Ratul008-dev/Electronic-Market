import React, { use } from 'react'
import './TopPicks.css'
import { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa6"
import { Link } from 'react-router-dom'
const TopPicks = () => {
    const [TopPicks, setTopPicks] = useState([])
    useEffect(() => {
        fetch('/TopPicks.json')
            .then(res => res.json())
            .then(data => setTopPicks(data))
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        
    }, [TopPicks])
    return (
        <div className="TopPicks-grid">
            {TopPicks.map((item) => (
                <Link to={item.path} key={item.id} className='product-link'>
                    <div className="TopPicks-card" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p className='rating'><FaStar className='star' />{item.rating}</p>
                        <p>₹{item.price.toLocaleString('en-IN')}</p>



                    </div>
                </Link>
            ))}
        </div>
    )
}

export default TopPicks