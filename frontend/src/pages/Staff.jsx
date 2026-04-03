import {useState} from 'react'
import NewProduct from '../components/NewProduct';
import UpdateProduct from '../components/UpdateProduct';
import DeleteProduct from '../components/DeleteProduct';

const Staff = ({ socket }) => {
  return (
    <div>
        <NewProduct socket = {socket}></NewProduct>
        <UpdateProduct socket = {socket}></UpdateProduct>
        <DeleteProduct socket = {socket}></DeleteProduct>
    </div>
  );
}

export default Staff