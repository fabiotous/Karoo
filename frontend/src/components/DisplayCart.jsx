import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DisplayCart({ refreshTrigger, socket }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      const inCartProducts = data.filter(product => product.inCart === true);
      setProducts(inCartProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  //without refreshTrigger, this would only load once on mount
  //without the dependency array, this would load on every render (infinite loop) - BAD!
  useEffect(() => {
    loadCart();
  }, [refreshTrigger]); // Reload when refreshTrigger changes

  useEffect(() => {
    if (!socket) return; 

    // --- UPDATE LISTENER ---
    const handleUpdatedProduct = (updatedPid) => {
      loadCart();
      window.alert('Product with ID ' + updatedPid + ' has been updated');
    };

    // --- DELETE LISTENER ---
    const handleDeletedProduct = (deletedPid) => {
      setProducts((prevProducts) => 
        prevProducts.filter((p) => p.pid !== deletedPid)
      );
      window.alert('Product with ID ' + deletedPid + ' has been removed');
    };

    // Turn on the listeners
    socket.on('refresh_single_product', handleUpdatedProduct);
    socket.on('remove_product_from_list', handleDeletedProduct);

    // Clean up when component unmounts
    return () => {
      socket.off('refresh_single_product', handleUpdatedProduct);
      socket.off('remove_product_from_list', handleDeletedProduct);
    };
  }, [socket]);

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  if (products.length === 0) {
    return (
      <>
        <div>
          <p>No products found in cart.</p>
        </div>
      </>
    );
  }

  return (
    <>
        {products.map(product => {
          const imageName = (product.hasImage ? product.name : 'PlaceholderProduct') + '.jpg';
          return (
            <div key={product.pid} className="cart-item">
                <div className="product-image">
                    <img src={`/images/electronic_products/${imageName}`} alt={product.title} />
                </div>
                <div className="product-info"><h3 className="product-title">{product.title}</h3></div>
                <div className="product-price">
                    <span>${product.price}</span>
                </div>
            </div>
          );
        })}
        <div className="subtotal">
            <span>Subtotal: ${totalPrice.toFixed(2)}</span>
            <div className="checkout">
                <button className="checkout-btn" onClick={() => navigate('/underconstruction')}>Proceed to Checkout</button>
            </div>
        </div>
        
        
    </>
  );
}

export default DisplayCart;