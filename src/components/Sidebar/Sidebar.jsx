import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
import {contextUser} from '../Main/Main'
import { useEffect } from 'react';

const Sidebar = () => {
    const [extended,setExtended] = useState(false)
    const {onSent, previous, setrecentPromt,newChat} = useContext(Context)
    const {isDark, setisDark} = useContext(contextUser) 
    const loadPromt = async (promt) => {
      setrecentPromt(promt)
      await onSent(promt)
    }
    

    useEffect(() => {
      const side = document.querySelector('.sidebar');
      const recentDark = document.querySelector('.recent');
      if (isDark) {
        side.classList.add('darkest_mode');
        // recentDark.classList.add('dark_mode');
      } else {
        side.classList.remove('darkest_mode');
        // recentDark.classList.remove('dark_mode');
      }
    }, [isDark]); // Trigger whenever isDark changes
    
  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={() => newChat()} className='new-chat'>
              <img src={assets.plus_icon} alt="" />
              {extended?<p>New chat</p> :null}
            </div>
            {extended
            ?<div className="recent">
              <p className="recent-title">Recent</p>
              {previous.map((item,index)=>{
                return (
                  <div onClick={()=>loadPromt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0,18)}...</p>
                  </div>
                )
              })}
              
            </div>
            :null}
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
              <img src={assets.question_icon} alt="" />
              {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.history_icon} alt="" />
              {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.setting_icon} alt="" />
              {extended?<p>Settings</p>:null}
            </div>
        </div>
    </div>
  )
}

export default Sidebar