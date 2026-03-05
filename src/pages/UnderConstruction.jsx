import React from 'react'
import '../css/under-construction.css';

const UnderConstruction = () => {
  return (
    <div className="under-construction-wrapper">
        <div className="container">
        <h1>Page Under Construction</h1>
        <p>
            Hello! This page is not yet built.
            <br/>
            We’re working hard to bring this feature to life.
        </p>
        <div className="note">
            Please check back soon.
        </div>
    </div>
    </div>
  )
}

export default UnderConstruction