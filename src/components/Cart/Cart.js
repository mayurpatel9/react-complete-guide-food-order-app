import classes from './Cart.module.css';
import Model from '../UI/Model';
import {useContext, useState} from 'react';
import CardContext from '../../store/cart-context';
import CardItem from '../Cart/CartItem';
import CheckOut from './CheckOut';
const Cart = (props) => {

    const cartCtx = useContext(CardContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;
    
    const onAddItemHandler =(item) =>{
        cartCtx.addItem({...item, amount: 1});
    }
    const onRemoveItemHandler =(id) => {
        cartCtx.removeItem(id);
    }

    const [isCheckout, SetCheckout] = useState(false);
    const cartItems = <ul>
        {cartCtx.items.map((item)=>(<CardItem key={item.id} amount={item.amount} name={item.name} price={item.price} onRemove={onRemoveItemHandler.bind(null, item.id)} onAdd={onAddItemHandler.bind(null, item)} />))}</ul>;
    
    const checkoutHandler = () =>{
        SetCheckout(true);
    }

    const submitHandler = (userData) => {

      fetch("https://personal-ad2cc-default-rtdb.firebaseio.com/meals.json",{
        method: 'POST',
        body: JSON.stringify({
          user:userData,
          orderedItems: cartCtx.items
        })
      });
    }

    const orderButtons = (
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItem && (
          <button className={classes.button} onClick={checkoutHandler}>
            Order
          </button>
        )}
      </div>
    );
    return (
      
      <Model onClose={props.onHideCart}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <CheckOut onConfirm={submitHandler} onCancel={props.onHideCart} />
        )}
        {!isCheckout && orderButtons}
      </Model>
    );
}
export default Cart;