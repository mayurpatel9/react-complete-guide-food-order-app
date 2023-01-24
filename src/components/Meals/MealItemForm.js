import { useRef, useState } from 'react';
import Input from '../UI/Input';
import classes from './MealItemForm.module.css';


const MealItemForm = (props) => {

    const [IsAmountValid, SetIsAmountValid] = useState(true);
    const amountInputRef = useRef();

    const ItemSubmitHandler = (event) => {
        event.preventDefault();
        
        const enteredAmount = +amountInputRef.current.value;

        if(enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5){
            SetIsAmountValid(false);
            return;
        }

        props.onAddToCart(enteredAmount);
    }

    return (
      <form className={classes.form} onSubmit={ItemSubmitHandler}>
        <Input
          label="Amount"
          ref={amountInputRef}
          input={{
            id: "amount",
            type: "number",
            min: 1,
            max: "5",
            defaultValue: "1",
          }}
        />
        <button>+ Add</button>
        {!IsAmountValid && <p>Please enter a valid amount</p>}
      </form>
    );
}

export default MealItemForm;