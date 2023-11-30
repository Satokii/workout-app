import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import HomeGif from '../../assets/home/home-exercise-gif.gif'
import HomeGifAlt from '../../assets/home/home-exercise-gif-alt.gif'
import '../../styles/home.css'

function Home({ showInitialDisplay, setShowInitialDisplay }) {

    // const [showInitialDisplay, setShowInitialDisplay] = useState(true)
    const [gif, setGif] = useState(true)

    const navigate = useNavigate()

    function handlePageDisplay() {
        setShowInitialDisplay(false)
    }

    function toggleGif() {
        setGif(!gif)
    }

    return (
        <section className="home grid">
            {showInitialDisplay ? 
            <div className='home-cover-menu'>
                <p>Welcome to <span>GymTyme</span></p>
                <a className='click-to-start' href="#home" onClick={() => handlePageDisplay()}>Click to Start</a>
            </div>
            :<div id='home' className='home-container'>
                <div className='content grid'>
                    <h3 className='home-what-to-do-header grid'>What would you like to do?</h3>
                    <ul className='home-options-list grid'>
                        <li onClick={() => navigate('/workouts')}>Go to the workouts page</li>
                        <li onClick={() => navigate('/exercises')}>See exercise suggestions</li>
                        <li>View your previous workouts</li>
                    </ul>
                    <div onMouseOver={() => toggleGif()}>
                        {gif ? 
                        <img className='home-gif home-gif-main' src={HomeGif} alt="home gif" /> 
                        : <img className='home-gif home-gif-alt' src={HomeGifAlt} alt="home gif alt" />
                        }
                    </div>
                </div>    
            </div>
            }
             {/* <div className='home-cover-menu'>
                 <p>Welcome to <span>GymTyme</span></p>
                 <a className='click-to-start' href="#home">Click to Start</a>
             </div> */}
            {/* <div id='home' className='home-container'>
                <div className='content grid'>
                    <h3 className='home-what-to-do-header grid'>What would you like to do?</h3>
                    <ul className='home-options-list grid'>
                        <li onClick={() => navigate('/workouts')}>Go to the workouts page</li>
                        <li onClick={() => navigate('/exercises')}>See exercise suggestions</li>
                        <li>View your previous workouts</li>
                    </ul>
                    <div onMouseOver={() => toggleGif()}>
                        {gif ? 
                        <img className='home-gif home-gif-main' src={HomeGif} alt="home gif" /> 
                        : <img className='home-gif home-gif-alt' src={HomeGifAlt} alt="home gif alt" />
                        }
                    </div>
                </div>    
            </div> */}
        </section>
    )
}

export default Home