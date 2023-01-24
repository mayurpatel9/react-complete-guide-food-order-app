import classes from './Cart.module.css'
import Model from '../UI/Model'

const Cart = (props) => {

    const cartItems = <ul>{[{id:'1', name:'Samosa', price: '10', amount: 2}].map((item)=><li>{item.name}</li>)}</ul>;
    return (
        <Model onClose = {props.onHideCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>45</span>
            </div>
            <div className={classes.actions}>
                <button className= {classes['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Model>
    );
}
export default Cart;