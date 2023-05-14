import React from 'react'
import '../../css/intropages/MainScroll.css';


function EmotionIcon({emotion}) {
  return (
    <img alt="emotion_img" 
        src={`/assets/img/${emotion}_emoji.png`} 
        className={emotion} 
    />
  )
}

export default EmotionIcon