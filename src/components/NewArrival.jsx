import React from 'react'
import { useEffect, useState } from 'react'
import './NewArrival.css'
import {FaStar} from "react-icons/fa6"
import { Link } from 'react-router-dom'

const NewArrival = () => {
    const[NewArrival,setNewArrival]=useState([])
    useEffect(()=>{
        fetch('./NewArrival.json')
        .then(res=>res.json())
        .then(data=>setNewArrival(data))
        .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
        
    },[NewArrival])
  return (
    <div className="NewArrival-grid">
            {NewArrival.map((item) => (
                <Link to={item.path} key={item.id} className='newarrival-link'>
                <div className="NewArrival-card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p className='rating'><FaStar className='star'/>{item.rating}</p>
                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                  


                </div>
                </Link>
            ))}
        </div>
  )
}

export default NewArrival