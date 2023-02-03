import CartContext from './cart-context';
import {useReducer} from 'react'
import { act } from 'react-dom/test-utils';


const defaultCartState ={
    items:[],
    totalAmount: 0
}

const cartReducer = (state, action) =>{
    if (action.type === 'ADD') {
        console.log(`state.items:${JSON.stringify(state.items)}`);
        console.log(`action.item:${JSON.stringify(action.item)}`);
        const updatedAmount = state.totalAmount + (action.item.price * action.item.amount);

        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        let existingItem = state.items[existingCartItemIndex];
        
        
        let updatedItems;
        if (existingItem) {
          let updatedItem = {
            ...existingItem,
            amount: existingItem.amount + action.item.amount,
          };
          updatedItems = [...state.items];
          updatedItems[existingCartItemIndex] = updatedItem;
        } else {
          updatedItems = state.items.concat(action.item);
        }

        return {
          items: updatedItems,
          totalAmount: updatedAmount,
        };
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex(
          (item) => item.id === action.id
        );
        let existingItem = state.items[existingCartItemIndex];
        let updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if(existingItem){
            if(existingItem.amount === 1){
                updatedItems = state.items.filter((item)=>item.id !== action.id);
            }else
            {
            let updatedItem = {
                ...existingItem,
                amount:existingItem.amount - 1,
            }
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount 
        }
    }
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