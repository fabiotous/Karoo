import React from 'react'
import DisplayProducts from '../components/DisplayProducts';
import '../css/beauty.css';

const Beauty = ({socket}) => {
  return (
    <>
    <div className="content">
      <div className="banner">
          <img src="/images/beauty/beauty.jpg" alt="banner"/>
      </div>

      <p className="description">
        Karoo is happy to provide a wide range of beauty products to suit your individual needs.
        Our products are top quality and contain only the best ingredients that can make you shine
        from the inside out. 
      </p>
    </div>
    <DisplayProducts socket={socket} route={"beauty"}></DisplayProducts>
    </>
  )
}

export default Beauty