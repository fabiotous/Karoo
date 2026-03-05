import {useState} from 'react'
import NewProduct from '../components/NewProduct';
import UpdateProduct from '../components/UpdateProduct';
import DeleteProduct from '../components/DeleteProduct';

const Staff = () => {
  return (
    <div>
        <NewProduct></NewProduct>
        <UpdateProduct></UpdateProduct>
        <DeleteProduct></DeleteProduct>
    </div>
  );
}

export default Staff