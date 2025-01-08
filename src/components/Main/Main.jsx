import React, { createContext, useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import Sidebar from '../Sidebar/Sidebar';

const contextUser = createContext();

const Main = () => {

    const {onSent,recentPromt,showresult,loading,resultdata,setInput,input} = useContext(Context)
    const [isDark, setisDark] = useState(JSON.parse(localStorage.getItem('isDarkMode')))
    if(isDark){
        document.body.classList.add('dark_mode')
    }
    else{
        document.body.classList.remove('dark_mode')
    }

    const valueContext = {
        isDark,
        setisDark,
    }

  return (
    <contextUser.Provider value={valueContext}>
        <>
          <Sidebar />
          <div className='main'>
                <div className="nav">
                    <p>Gemini</p>
                    <div className='dark-mode'>
                        <img onClick={() => {
                            setisDark(!isDark)
                            localStorage.setItem('isDarkMode',!isDark)
                        }} src={isDark ? assets.moon:assets.sun} alt="" />
                        <img src={assets.user_icon} alt="" />
                    </div>
                </div>
        
                    <div className="main-container">
                    {!showresult
                    ?<>
                            <div className="greet">
                            <p><span>Hello, Piyush.</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>
                                    Suggest beautiful places to see on an upcoming road trip
                                </p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>
                                    Briefly sumarize this concept: urban planning
                                </p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>
                                    Brainstorm team bonding activites for our work retreat
                                </p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>
                                    Improve the readability of the following code
                                </p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                        </>
                    :<div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPromt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading
                            ? <div className="loader">
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html: resultdata}}></p>}
                        </div>
                    </div>
                    }
                        
                        <div className="main-bottom">
                            <div className="search-box">
                                <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a promt here' />
                                <div>
                                    <img src={assets.gallery_icon} alt="" />
                                    <img src={assets.mic_icon} alt="" />
                                    {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
                                </div>
                            </div>
                            <p className='bottom-info'>
                                Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
                            </p>
                        </div>
                    </div>

                        </div>
           
                        
        </>               
    </contextUser.Provider>
    
  )
}

export default Main
export {contextUser}