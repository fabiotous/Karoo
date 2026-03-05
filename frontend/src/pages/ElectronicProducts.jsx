import React from 'react'
import DisplayProducts from '../components/DisplayProducts';
import '../css/electronic-products.css';

// I have taken care of fetching and displaying the products from the backend
// Chloe, you can take care of the rest of the frontend for this page from Assignment 1
// You can also try to fix the size of the product price font because for some reason it is smaller here
// If not then no worries it won't matter much

const ElectronicProducts = () => {
  return (
    <>
    <div className="content">
      <div className="banner">
          <img src="/images/electronic_products/elec-banner.jpg" alt="banner"/>
      </div>

      <p className="description">
        Karoo carries a wide selection of top-quality competitively priced electronic products. 
        We pride ourselves in sourcing only authentic products from the best brands and honour
        a 1 year warrantly on all products. Browse our growing selection below!
      </p>
    </div>
    <DisplayProducts></DisplayProducts>
    </>
  )
}

export default ElectronicProducts