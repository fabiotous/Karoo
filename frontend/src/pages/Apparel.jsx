import React from 'react'
import DisplayProducts from '../components/DisplayProducts';
import '../css/apparel.css';

const Apparel = ({socket}) => {
  return (
    <>
    <div className="content">
      <div className="banner">
          <img src="/images/apparel/apparel.png" alt="banner"/>
      </div>

      <p className="description">
        Shop Karoo's selection of mens and women's clothing. We have clothes for every season and occasion
        and strive to provide only the best quality pieces to our customers. From top to bottom Karoo has what
        you're looking for.
      </p>
    </div>
    <DisplayProducts socket={socket} route={"apparel"}></DisplayProducts>
    </>
  )
}

export default Apparel