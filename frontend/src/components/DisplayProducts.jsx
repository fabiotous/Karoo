import { useState, useEffect } from 'react';


function DisplayProducts({ refreshTrigger, socket }) {
  const [products, setProducts] = useState([]);
  const [loadingAction, setLoadingAction] = useState({}); // pid → true/false

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

  useEffect(() => {
    if (!socket) return; 

    const handleNewProduct = (newProduct) => {
      // setProducts((prevProducts) => [...prevProducts, newProduct]);
      loadProducts();
      window.alert('Product ' + newProduct.title + ' has been added');
    };
    socket.on('update_product_list', handleNewProduct);

    return () => {
      socket.off('update_product_list', handleNewProduct);
    };
  }, [socket]); 



  const toggleCart = async (pid, currentInCart) => {
    const newInCart = !currentInCart;

    setLoadingAction(prev => ({ ...prev, [pid]: true }));

    try {
      const res = await fetch(`/api/products/${pid}/cart`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inCart: newInCart }),
      });

      if (!res.ok) throw new Error('Failed to update cart');

      await loadProducts();

    } catch (err) {
      console.error(err);
      alert('Could not update cart. Please try again.');
    } finally {
      setLoadingAction(prev => ({ ...prev, [pid]: false }));
    }
  };

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
              {product.inCart ? (<button className="cart-btn" onClick={() => toggleCart(product.pid, true)}>Remove from Cart</button>) : (<button className="cart-btn" onClick={() => toggleCart(product.pid, false)}>Add to Cart</button>)}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DisplayProducts;