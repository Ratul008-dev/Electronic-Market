import React from 'react'
import { useEffect, useState } from 'react'
import './About.css'
import Footer from './Footer'
const About = () => {
    const [openQuestion, setOpenQuestion] = useState(null)
    return (
        <> 
        <div className="About-container">
            <div className="About-note">
                <h1>Our Story: Passion for Technology, Commitment to Quality</h1>
                <h3>Welcome to our <span>Electronic Market</span>, your trusted destination for modern technology and quality gadgets.
                    We are passionate about bringing the latest monitors, computer components, cameras, accessories,
                    and smart devices to customers at competitive prices. Our mission is to provide a simple, reliable,
                    and enjoyable shopping experience while helping customers find the right technology for work, gaming,
                    and everyday life. As a growing startup, we are committed to quality products, customer satisfaction,
                    and continuous improvement in everything we do.</h3>
            </div>
            <h2>Frequently Asked Questions.</h2>
            <div className="Questions">
                <h2 onClick={() => setOpenQuestion(openQuestion === 1 ? null : 1)}>
                    What Makes Electronic Market Different?</h2>
                {openQuestion === 1 && (
                    <p><span>Electronic Market</span>   combines quality products,
                        affordable pricing, and customer-focused service to create a
                        reliable and enjoyable technology shopping experience.</p>)}
            </div>
            <div className="SQuestion">
                <h2 onClick={() => setOpenQuestion(openQuestion == 2 ? null : 2)}>What Products Do We Offer?</h2>
                {openQuestion === 2 && (
                    <p><span>Electronic Market</span> offers a wide range of technology products,
                        including monitors, mobile phones, computer components, graphics cards, cameras, audio devices,
                        accessories, and smart gadgets. We carefully select products that provide performance, reliability,
                        and value for every type of user.</p>
                )}
            </div>
            <div className="TQuestion">
                <h2 onClick={() => setOpenQuestion(openQuestion == 3 ? null : 3)}>How Do We Select Our Products?</h2>
                {openQuestion === 3 && (
                    <p><span>Electronic Market</span>, we carefully evaluate products based on quality, performance, customer demand,
                        and value for money. Our goal is to offer technology that meets modern needs while ensuring reliability
                        and customer satisfaction.</p>
                )}
            </div>
            <div className="LQuestion">
                <h2 onClick={() => setOpenQuestion(openQuestion == 4 ? null : 4)}>Why Should Customers Choose Electronic Market?</h2>
                {openQuestion === 4 && (
                    <p><span>Electronic Market</span> is dedicated to providing quality products, competitive pricing,
                        and a smooth shopping experience. We focus on customer satisfaction, trusted technology,
                        and continuous improvement to ensure every customer can shop with confidence.</p>
                )}
            </div>
        </div>
        <Footer/>
         </>
    )
}

export default About