import { useState, useEffect } from 'react';


function DisplayProducts({ refreshTrigger, socket, route }) {
  const [products, setProducts] = useState([]);
  const [loadingAction, setLoadingAction] = useState({}); // pid → true/false
  const [userEmail, setUserEmail] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      loadCart(userEmail);
    }
  }, [userEmail]);

  const loadProducts = async () => {
    try {
      const response = await fetch(`/api/${route}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCart = async (emailToFetch) => {
    if (!emailToFetch) return; 
    
    try {
      const response = await fetch(`/api/cart/${emailToFetch}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      
      const cartData = await response.json();
      setCart(cartData); 
    } catch (error) {
      console.error('Error loading cart:', error);
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
      //setProducts((prev) => [...prev, newProduct]);
      loadProducts();
      window.alert('Product ' + newProduct.title + ' has been added');
    };

    const handleUpdatedProduct = (updatedPid) => {
      loadProducts();
      window.alert('Product with ID ' + updatedPid + ' has been updated');
    };

    const handleDeletedProduct = (deletedPid) => {
      /* setProducts((prevProducts) => 
        prevProducts.filter((p) => p.pid !== deletedPid)
      ); */
      loadProducts();
      window.alert('Product with ID ' + deletedPid + ' has been removed');
    };

    socket.on('update_product_list', handleNewProduct);
    socket.on('refresh_single_product', handleUpdatedProduct);
    socket.on('remove_product_from_list', handleDeletedProduct);

    return () => {
      socket.off('update_product_list', handleNewProduct);
      socket.off('refresh_single_product', handleUpdatedProduct);
      socket.off('remove_product_from_list', handleDeletedProduct);
    };
  }, [socket]);

  const isProductInCart = (productId) => {
    return cart.some(cartItem => {
      const savedId = cartItem.product._id || cartItem.product;
      
      return String(savedId) === String(productId);
    });
  };

  const toggleCart = async (pid, currentlyInCart) => {

    setLoadingAction(prev => ({ ...prev, [pid]: true }));

    try {
      const endpoint = currentlyInCart ? '/api/cart/remove' : '/api/cart/add';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, productId: pid }),
      });

      if (!res.ok) throw new Error('Failed to update cart');

      await loadCart(userEmail);

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
          const inCart = isProductInCart(product._id || product.pid);
          return (
            <div key={product.pid} className="product-card">
              <img src={`/images/product_images/${imageName}`} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              {inCart ? (<button className="cart-btn" onClick={() => toggleCart(product._id || product.pid, true)}>Remove from Cart</button>) : (<button className="cart-btn" onClick={() => toggleCart(product._id || product.pid, false)}>Add to Cart</button>)}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DisplayProducts;