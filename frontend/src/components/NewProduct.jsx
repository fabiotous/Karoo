import { useState } from 'react';
import React, { useEffect } from 'react';


function NewProduct({ onProductAdded, socket }) {

  const [selectedForm, setFormVal] = useState("");

  const formChange = async (e) => {
    const category = e.target.value;

    setFormVal(category);

    setFormData({
    ...formData,
    category: category});
  };
   
  const [formData, setFormData] = useState({
    pid: '',
    title: '',
    name: '',
    price: '',
    stock: '',
    note: '',
    brand: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category) {
  alert("Please select a category");
  return;
}
    
    const newProduct = {
      pid: formData.pid,
      title: formData.title,
      name: formData.name,
      category: formData.category,
      price: parseInt(formData.price),
      stock: parseInt(formData.stock),
      brand: formData.brand,
      note: formData.note
    };

    let endpoint = "/api/products";

  if (formData.category === "Electronics") {
      endpoint = "/api/products/electronic";
  } else if (formData.category === "Beauty") {
      endpoint = "/api/products/beauty";
  } else if (formData.category === "Apparel") {
      endpoint = "/api/products/apparel";
  }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const result = await response.json();
      
      if (response.status === 201) {
        alert('Product added successfully!');
        socket.emit('new_product_added', newProduct);
        setFormData({ pid: '', title: '', name: '', category: '', price: '' , stock: '', note: '', brand:''}); // Reset form
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
        <h2>Choose a product category</h2>
        <select value={selectedForm} onChange={formChange}>
          <option value="">Select an option</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty">Beauty</option>
          <option value="Apparel">Apparel</option>
        </select>
        {(selectedForm === "Electronics" || selectedForm === "Beauty" || selectedForm === "Apparel") && (
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
          <input 
            type="text" 
            name="brand" 
            placeholder="Brand" 
            value={formData.brand}
            onChange={handleChange}
          />
          <button type="submit">Add Product</button>
          </form>
        )}
          

        
      </div>
    </>
  );
}

export default NewProduct;