import React from 'react'


const About = () => {
    const aboutStyle = {
        backgroundImage: `url('/images/about/Karoo.jpg')`, 
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        margin: 0,
        padding: '4vh 0vw',
        height: '100vh',
        width: '100%',
        
    }
    const contentStyle = {
        position: 'relative',
        minHeight: '28vh',
        padding: '4vh 10vw',
        backdropFilter: 'blur(2px)',        
        maxWidth: "700px",
        margin: '60px auto auto auto',      
        color: 'white',
        fontSize: "25px",                       
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }
  return (
    <div>
        <div style={aboutStyle}>
            <h2 style={contentStyle}>In the heart of the South African wilderness lies the Karoo—a place where time slows down
            and the horizon never ends. We founded Karoo because the modern internet feels like a crowded city: noisy,
            cluttered, and overwhelming.</h2>
            <h2 style={contentStyle}>We wanted to create a "digital oasis." Just like the resilient flora that thrives in the desert,
            our products are selected for their durability and purpose. We don’t believe in "more"; we believe in "better."
            Karoo is our way of bringing that desert clarity to your everyday life.</h2>
    </div>
    </div>
  )
}

export default About