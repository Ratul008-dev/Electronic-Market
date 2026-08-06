import React from 'react'
import { NavLink } from 'react-router-dom'
import "./MoreBtn.css"
const MoreBtn = () => {
    return (
        <NavLink to="/Products" className="more-link">
            <div className="morebtn-container">
            <button className='more-btn'>More</button>
            </div>
        </NavLink>
    )
}

export default MoreBtn