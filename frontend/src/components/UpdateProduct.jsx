import { useState } from 'react';

function UpdateProduct({ onProductUpdated, socket }) {
  const [pid, setpid] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedproduct = {};
    if (price) {
      updatedproduct.price = price;
    }

    try {
      const response = await fetch(`https://karoo-production.up.railway.app/api/products/pid/${pid}` || `/api/products/pid/${pid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedproduct)
      });
      const result = await response.json();
      
      if (response.status === 200) {
        alert('product updated successfully!');
        socket.emit('product_updated', pid);
        setpid('');
        setPrice('');
        if (onProductUpdated) onProductUpdated(); // Refresh the product list
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <>
      <div id="update-product">
        <h2>Change price (Update product)</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            placeholder="pid to Update" 
            value={pid}
            onChange={(e) => setpid(e.target.value)}
            required 
          />
          <input 
            type="number" 
            placeholder="New Price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
          />
          <button type="submit">Update product</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;