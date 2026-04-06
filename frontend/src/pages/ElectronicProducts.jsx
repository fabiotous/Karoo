import React from 'react'
import DisplayProducts from '../components/DisplayProducts';
import '../css/electronic-products.css';

const ElectronicProducts = ({socket}) => {
  return (
    <>
    <div className="content">
      <div className="banner">
          <img src="/images/electronics/elec-banner.jpg" alt="banner"/>
      </div>

      <p className="description">
        Karoo carries a wide selection of top-quality competitively priced electronic products. 
        We pride ourselves in sourcing only authentic products from the best brands and honour
        a 1 year warrantly on all products. Browse our growing selection below!
      </p>
    </div>
    <DisplayProducts socket={socket} route={"electronic"}></DisplayProducts>
    </> 
  ) 
} 

export default ElectronicProducts