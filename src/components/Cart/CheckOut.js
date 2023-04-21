import { useRef, useState } from 'react';
import classes from './Checkout.module.css'

const CheckOut =(props) => {

  const refNameInput = useRef();
  const refStreetInput = useRef();
  const refPostalInput = useRef();
  const refCityInput = useRef();

  const [isError, setError] = useState(false);
  
const submitHandler = (event) =>{
  event.preventDefault();

  if(refNameInput.current.value.trim() === '' && refStreetInput.current.value.trim() === '' && refPostalInput.current.value.trim() === '' && refCityInput.current.value.trim() === ''){
    setError(true);
    console.log('setError')
  }

  props.onConfirm({
    name: refNameInput.current.value,
    street: refStreetInput.current.value,
    city: refCityInput.current.value,
    postalCode: refPostalInput.current.value
  });
}
return (
  <form onSubmit={submitHandler}>
    {isError && 
      <div>
        <section>Please fill all the inputs</section>
      </div>
    }
    <div className={classes.control}>
      <label htmlFor="name">Your name</label>
      <input id="name" type="text" ref={refNameInput}></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="street">Street</label>
      <input id="street" type="text" ref={refStreetInput}></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="postal">Postal Code</label>
      <input id="postal" type="text" ref={refPostalInput}></input>
    </div>
    <div className={classes.control}>
      <label htmlFor="city">City</label>
      <input id="city" type="text" ref={refCityInput}></input>
    </div>
    <button>Confirm</button>
    <button type="button" onClick={props.onCancel}>
      Cancel
    </button>
  </form>
);

}

export default CheckOut;