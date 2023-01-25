import CartIcon from "./CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from "react";
const HeaderCartButton = (props) =>{

  const cartCtx = useContext(CartContext);

  //TODO, fix the below reduce method.
  //const numberOfCartItems = 0;

 
  
  const numberOfCartItems = cartCtx.items ? cartCtx.items.reduce((currentItem, item) => {
     return (currentItem + item.amount);
  }, 0) : 0;

  console.log(JSON.stringify(cartCtx));
  
    return (
        <button className={classes.button} onClick={props.onClick}>
          <span className={classes.CartIcon}>
            <CartIcon/>
          </span>
          <span> Your Cart</span>
          <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

export default HeaderCartButton;