import { useState } from 'react';

function UpdateProduct({ onProductUpdated }) {
  const [pid, setpid] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedproduct = {};
    if (note) {
      updatedproduct.note = note;
    }

    try {
      const response = await fetch(`/api/products/pid/${pid}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedproduct)
      });
      const result = await response.json();
      
      if (response.status === 200) {
        alert('product updated successfully!');
        setpid('');
        setNote('');
        if (onproductUpdated) onproductUpdated(); // Refresh the product list
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
        <h2>Add Note (Update product)</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            placeholder="pid to Update" 
            value={pid}
            onChange={(e) => setpid(e.target.value)}
            required 
          />
          <input 
            type="text" 
            placeholder="New Note" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required 
          />
          <button type="submit">Update product</button>
        </form>
      </div>
    </>
  );
}

export default UpdateProduct;