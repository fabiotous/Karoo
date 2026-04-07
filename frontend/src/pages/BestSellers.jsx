import React from 'react'
import DisplayProducts from '../components/DisplayProducts';
import '../css/best-sellers.css';

const BestSellers = ({socket}) => {
  return (
    <>
    <div className="content">
      <div className="banner">
          <img src="/images/best_sellers/best.png" alt="banner"/>
      </div>

      <p className="description">
        Shop Karoo's best selling collection. These are the things our customers keep coming back for. Our top quality products speak for themselves. 
        Give these products a try and you won't be disappointed. 
      </p>
    </div>
    <DisplayProducts socket={socket} route={"random"}></DisplayProducts>
    </>
  )
}

export default BestSellers