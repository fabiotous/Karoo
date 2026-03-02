import { useState, useEffect } from 'react';

function DisplayProducts({ refreshTrigger }) {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  //without refreshTrigger, this would only load once on mount
  //without the dependency array, this would load on every render (infinite loop) - BAD!
  useEffect(() => {
    loadProducts();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  if (products.length === 0) {
    return (
      <>
        <div>
          <p>No products found.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="product-grid">
        {products.map(product => {
          const imageName = (product.hasImage ? product.name : 'PlaceholderProduct') + '.jpg';
          return (
            <div key={product.pid} className="product-card">
              <img src={`/images/electronic_products/${imageName}`} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DisplayProducts;