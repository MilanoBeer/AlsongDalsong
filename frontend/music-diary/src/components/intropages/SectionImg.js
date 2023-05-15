import React from 'react'


function SectionImg({imgFileName}) {
  return (
    <img 
        src={`/assets/img/${imgFileName}`} 
        alt="img_file" 
        style={{
                  width: '25vw',
                  backgroundColor: '#ffffff',
                  borderRadius: '15px',
                  boxShadow: '10px 10px #dcdca2',
                  marginBottom: '3vh'
                }}   
    />
  )
}

export default SectionImg
