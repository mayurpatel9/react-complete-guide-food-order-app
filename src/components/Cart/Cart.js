import classes from './Cart.module.css';
import Model from '../UI/Model';
import {useContext} from 'react';
import CardContext from '../../store/cart-context';
import CardItem from '../Cart/CartItem';
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

    //const cartItems = <ul>{cartCtx.items.map((item)=><li>{item.name}</li>)}</ul>;
    const cartItems = <ul>{cartCtx.items.map((item)=>(<CardItem key={item.id} amount={item.amount} name={item.name} price={item.price} onRemove={onRemoveItemHandler.bind(null, item.id)} onAdd={onAddItemHandler.bind(null, item)} />))}</ul>;
    
    return (
        <Model onClose = {props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className= {classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItem && <button className={classes.button}>Order</button>}
            </div>
        </Model>
    );
}
export default Cart;