import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DisplayCart({ refreshTrigger, socket }) {
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [cart, setCart] = useState([]); 
  const navigate = useNavigate();

  const loadCart = async (emailToFetch) => {
    if (!emailToFetch) return; 
    
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/cart/${emailToFetch}?t=${timestamp}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      
      const cartData = await response.json();
      setCart(cartData); 
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  useEffect(() => {
    if (userEmail) {
      loadCart(userEmail);
    }
  }, [userEmail, refreshTrigger]);

  useEffect(() => {
    if (!socket) return; 

    const handleUpdatedProduct = (updatedPid) => {
      loadCart(userEmail);
      window.alert('Product with ID ' + updatedPid + ' has been updated');
    };

    const handleDeletedProduct = (deletedPid) => {
      setCart((prevCart) => 
        prevCart.filter((cartItem) => {
          const prod = cartItem.product;
          const currentPid = prod._id || prod.pid;
          return currentPid !== deletedPid;
        })
      );
      window.alert('Product with ID ' + deletedPid + ' has been removed');
    };

    socket.on('refresh_single_product', handleUpdatedProduct);
    socket.on('remove_product_from_list', handleDeletedProduct);

    return () => {
      socket.off('refresh_single_product', handleUpdatedProduct);
      socket.off('remove_product_from_list', handleDeletedProduct);
    };
  }, [socket, userEmail]);

  const totalPrice = cart.reduce((sum, cartItem) => {
    if (cartItem.product && cartItem.product.price) {
        return sum + cartItem.product.price;
    }
    return sum;
  }, 0);

  if (cart.length === 0) {
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
        {cart.map(cartItem => {
          if (!cartItem.product) return null; 

          const product = cartItem.product;
          const imageName = (product.hasImage ? product.name : 'PlaceholderProduct') + '.jpg';
          return (
            <div key={product.pid || product._id} className="cart-item">
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