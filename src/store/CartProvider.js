import CartContext from './cart-context';
import {useReducer} from 'react'


const defaultCartState ={
    items:[],
    totalAmount: 0
}

const cartReducer = (state, action) =>{
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedAmount = state.totalAmount + (action.item.price * action.item.amount);

        return {
          items: updatedItems,
          updatedAmount: updatedAmount,
        };
    }
    if(action.type === 'REMOVE'){
        
    }

    return defaultCartState;
}

const CartProvider = (props) =>{

    const addItemToCartHandler = (item) =>{
        dispatchCartAction({type:'ADD', item:item})
    }
    const removeItemFromCartHandler = (id) =>{
        dispatchCartAction({type:'REMOVE', id: id})
    }

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const cartContext = {
      items: cartState.items,
      totalAmount: cartState.totalAmount,
      addItem: addItemToCartHandler,
      removeItem: removeItemFromCartHandler,
    };

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>

}

export default CartProvider