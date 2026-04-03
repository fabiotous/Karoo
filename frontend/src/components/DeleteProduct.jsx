import { useState } from 'react';

function DeleteProduct({ onProductDeleted, socket }) {
  const [pid, setPid] = useState('');

  console.log(pid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/products/pid/${pid}`, {
        method: 'DELETE'
      });
      
      if (response.status === 204) {
        alert('product deleted successfully!');
        socket.emit('product_deleted', pid);
        setPid('');
        if (onproductDeleted) onproductDeleted(); // Refresh the product list
      } else {
        const result = await response.json();
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div id="delete-product">
        <h2>Delete product</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="number" 
            placeholder="pid to Delete" 
            value={pid}
            onChange={(e) => setPid(e.target.value)}
            required 
          />
          <button type="submit">Delete product</button>
        </form>
      </div>
    </>
  );
}

export default DeleteProduct;
    