import classes from './AvailableMeals.module.css'
import Card from '../UI/Card.js'
import MealItem from './MealItem';
import {useEffect, useState} from 'react'
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];



const AvailableMeals = () => {

  const [meals,setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(
        "https://personal-ad2cc-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error("something went wrong!");
      }

      const responseData = await response.json();

      const mealsData = [];

      for(const key in responseData){
          console.log(key);
          mealsData.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
      }
      setMeals(mealsData);
    };
     

    fetchData().catch((error) =>{
        setIsLoading(false);
        setHttpError(error.message);
      }
    )
   

    setIsLoading(false);

  }, []);

  if(isLoading){
    return(
    <section className={classes.MealsLoading}>
      <p>Loading....</p>
    </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsLoadingError}>
        <p>{httpError}</p>
      </section>
    );
  }
    const list = meals.map((meal) => (
      <li>
        <MealItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      </li>
    ));
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{list}</ul>
        </Card>
      </section>
    );
}

export default AvailableMeals;