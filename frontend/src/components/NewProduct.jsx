import { useState } from 'react';
import React, { useEffect } from 'react';


function NewProduct({ onProductAdded, socket }) {

  const [selectedForm, setFormVal] = useState("Default");

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
    brand: '',
    manufacturer: '',
    category: 'Default'
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
      note: formData.note,
      manufacturer: formData.manufacturer
    };

    let endpoint = "/api/products";

  if (formData.category === "Electronics") {
      endpoint = "https://karoo-production.up.railway.app/api/products/electronic" || "/api/products/electronic";
  } else if (formData.category === "Beauty") {
      endpoint = "https://karoo-production.up.railway.app/api/products/beauty" || "/api/products/beauty";
  } else if (formData.category === "Apparel") {
      endpoint = "https://karoo-production.up.railway.app/api/products/apparel" || "/api/products/apparel";
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
        setFormData({ pid: '', title: '', name: '', category: 'Default', price: '' , stock: '', note: '', brand:'', manufacturer:''}); // Reset form
        setFormVal("Default");
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
          <option value="Default">Select an option</option>
          <option value="Electronics">Electronics</option>
          <option value="Beauty">Beauty</option>
          <option value="Apparel">Apparel</option>
        </select>
        {(selectedForm !== "Default") && (<form onSubmit={handleSubmit}>
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
          {(selectedForm === "Beauty" || selectedForm === "Apparel") && (
            <input 
            type="text" 
            name="brand" 
            placeholder="Brand" 
            value={formData.brand}
            onChange={handleChange}
          />
          )}
          {(selectedForm === "Electronics") && (
            <input 
            type="text" 
            name="manufacturer" 
            placeholder="Manufacturer" 
            value={formData.manufacturer}
            onChange={handleChange}
          />
          )}
          <button type="submit">Add Product</button>
          </form>)}
      </div>
    </>
  );
}

export default NewProduct;