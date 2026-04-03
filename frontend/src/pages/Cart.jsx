import '../css/cart.css';
import DisplayCart from '../components/DisplayCart';

const Cart = ({socket}) => {
  return (
    <div className="cart-container">
        <h1 className="cart-header">Shopping Cart</h1>
        <div className="cart-item-list">
        <DisplayCart socket={socket}></DisplayCart>
        </div>
    </div>
  )
}

export default Cart