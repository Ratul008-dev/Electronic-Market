import { useState, useEffect } from 'react'
import "./Navbar.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { FaBars, FaXmark, FaCircleUser } from 'react-icons/fa6'
import { Toaster, toast } from 'react-hot-toast'
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const username = localStorage.getItem("username");
    const navigate = useNavigate()
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('cart');
        toast.success('Logged out Successfully');
        navigate('/Login')
    }
    return (
        <div>
            <nav>
                
                <div className="hamburger" onClick={toggleMenu}>
                    {isOpen ? <FaXmark className="xmark-icon" /> : <FaBars />}
                </div>
                <div className={`nav-links ${isOpen ? "open" : ""}`}>
                    <div className="logo">
                    <img src="image/logo.png" alt="" className='logo-image'/>
                    <h2>Electronic Market</h2>
                </div>
                    <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/">
                        Home
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/Products">
                        Products
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/About">
                        About Us
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/Contact">
                        Contact Us
                    </NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active-link" : "")} to="/Cart">
                        Cart
                    </NavLink>
                    <div className="user-section">
                        <FaCircleUser
                            className="profile-icon"
                            onClick={()=>{
                                if(username){
                                    setShowMenu(!showMenu)
                                }else{
                                    navigate('/Login')
                                }
                            }}
                        />
                        {username && showMenu &&(
                            <div className="profile-menu">
                                <p className='user-name'>Hi, {username}</p>
                                <button className='logout-btn' onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <Toaster />
        </div>
    )
}

export default Navbar
