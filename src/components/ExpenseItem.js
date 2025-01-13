import React from 'react';
import { set, ref, get} from "firebase/database";
import database from "./firebaseDB";

function ExpenseItem(props) {


    const addToCart = (event) => {
        event.preventDefault();

        const card = {
            name: props.name,
            picture: props.picture,
            price: props.price,
        };

        try {
            const dbRef = ref(database, `cart/${card.name}`);
            // Read current count of the card
            get(dbRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const existingCard = snapshot.val();
                    const updatedCard = {
                        ...existingCard,
                        count: existingCard.count + 1, // Increment the count
                    };
                    set(dbRef, updatedCard).then(() => {
                        console.log(`${card.name} count incremented!`);
                        alert(`${card.name} added to your cart again!`);
                    });
                } else {
                    // Add new card with a count of 1
                    const newCard = { ...card, count: 1 };
                    set(dbRef, newCard).then(() => {
                        console.log(`${card.name} added to cart!`);
                        alert(`${card.name} added to your cart!`);
                    });
                }
            });
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };





  return (
    <div>
      <div>{props.name}</div>
      <img src={props.picture} alt={props.name} />
      <div>{props.price}€</div>
      <button className= "add-to-cart-btn" onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ExpenseItem;
