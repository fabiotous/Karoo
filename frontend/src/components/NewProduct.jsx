import { useState } from 'react';
import React, { useEffect } from 'react';


function NewProduct({ onProductAdded, socket }) {
  const [formData, setFormData] = useState({
    pid: '',
    title: '',
    name: '',
    category: '',
    price: '',
    stock: '',
    note: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newProduct = {
      pid: formData.pid,
      title: formData.title,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      note: formData.note
    };

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const result = await response.json();
      
      if (response.status === 201) {
        alert('Product added successfully!');
        socket.emit('new_product_added', newProduct);
        setFormData({ pid: '', title: '', name: '', category: '', price: '' , stock: '', note: ''}); // Reset form
        if (onProductAdded) onProductAdded(); // Refresh the product list
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div id="new-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            name="pid" 
            placeholder="PID" 
            value={formData.pid}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="title" 
            placeholder="Title" 
            value={formData.title}
            onChange={handleChange}
            required 
          />
           <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="category" 
            placeholder="Category" 
            value={formData.category}
            onChange={handleChange}
            required 
          />
          <input 
            type="number" 
            name="price" 
            placeholder="Price" 
            value={formData.price}
            onChange={handleChange}
            required 
          />
         <input 
            type="number" 
            name="stock" 
            placeholder="Stock" 
            value={formData.stock}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="note" 
            placeholder="Note" 
            value={formData.note}
            onChange={handleChange} 
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </>
  );
}

export default NewProduct;