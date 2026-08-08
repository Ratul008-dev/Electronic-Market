import React from 'react'
import { useEffect } from 'react'
import HomeLogic from './HomeLogic'
import TopPicks from './TopPicks'
import Trending from './Trending'
import NewArrival from './NewArrival'
import MoreBtn from './MoreBtn'
import "./Home.css"
import Footer from './Footer'
import AI from './AI'
const Home = () => {
    useEffect(() => { HomeLogic() }, [])
    return (
        <>
            <div className='carousel prev'>
                <div className="list">
                    <div className="item active"><img className='desktop' src="/image/banner1.jpg" alt="" />
                        < img className='mobile' src="/image/banner1-mobile.jpg" alt="" />
                    </div>
                    <div className="item"><img className='desktop' src="/image/banner2.jpg" alt="" />
                        <img className='mobile' src="/image/banner2-mobile.jpg" alt="" />
                    </div>
                    <div className="item"><img className='desktop' src="/image/banner3.jpg" alt="" />
                        <img className='mobile' src="/image/banner3-mobile.jpg" alt="" />
                    </div>
                    <div className="item"><img className='desktop' src="/image/banner4.jpg" alt="" />
                        <img className='mobile' src="/image/banner4-mobile.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className="arrows">
                <button className="arrow" id='prev'>‹</button>
                <button className="arrow" id='next'>›</button>
            </div>
            {/* <ul className="dots">
                <li className='active'></li>
                <li></li>
                <li></li>
                <li></li>
            </ul> */}
            <div className="TopPicks">
                <h2>Top Picks: Our most loved products</h2>
                <TopPicks />
                <MoreBtn />
            </div>
            <div className="Trending">
                <h2>Trending Products: What's hot right now</h2>
                <Trending />
                <MoreBtn />
            </div>
            <div className="NewArrival">
                <h2>New Arrivals: The latest tech collection</h2>
                <NewArrival />
                <MoreBtn />
            </div>
            <AI />
            <div className="footer"><Footer /></div>
            
        </>
    )
}

export default Home