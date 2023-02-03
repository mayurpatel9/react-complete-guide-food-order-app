import CartIcon from "./CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = (props) =>{

  const cartCtx = useContext(CartContext);
  
  const [isBtnHighlighted, setIsBtnHighlighted] = useState(false);


  const numberOfCartItems = cartCtx.items.reduce((currentItem, item) => {
     return (currentItem + item.amount);
  }, 0);

  const btnClass =`${classes.button} ${isBtnHighlighted? classes.bump: ''}`;

  const items = cartCtx.items;
  useEffect(() =>{
    if(items.length === 0) return;
    setIsBtnHighlighted(true);

    const timer = setTimeout(() => {
      setIsBtnHighlighted(false);
    }, 300);

    return () =>{
      clearTimeout(timer);
    }
  }, [items])
  
    return (
      <button className={btnClass} onClick={props.onClick}>
        <span className={classes.CartIcon}>
          <CartIcon />
        </span>
        <span> Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
      </button>
    );
};

export default HeaderCartButton;