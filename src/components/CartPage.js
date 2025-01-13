import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import database from "./firebaseDB";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cards from Firebase
  const fetchCardsFromFirebase = async () => {
    try {
      const dbRef = ref(database, "cart");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const cartItems = Object.values(data);
        setCartItems(cartItems);

        const total = cartItems.reduce((sum, item) => sum + (item.price * item.count || 0), 0);
        setTotalAmount(total);
      } else {
        console.log("No data available.");
        setCartItems([]);
        setTotalAmount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Remove card from Firebase
  const removeFromCart = async (cardName) => {
    try {
      const dbRef = ref(database, `cart/${cardName}`);
      await remove(dbRef); // Remove the card from Firebase
      console.log(`${cardName} removed from cart.`);
      // Refresh the cart items
      fetchCardsFromFirebase();
    } catch (error) {
      console.error("Error removing card:", error);
    }
  };

  useEffect(() => {
    fetchCardsFromFirebase();
  }, []);

  return (
      <div>
        <h1>Your Cart</h1>
        <h2>Total: {totalAmount}€</h2>
        <div className="cart-items">
          {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <div>{item.name}</div>
                <img
                    src={item.picture}
                    alt={item.name}
                    style={{width: "200px", height: "300px"}}
                />
                <div>Price: {item.price}€</div>
                <div>Quantity: {item.count}</div>
                <button className="remove-btn" onClick={() => removeFromCart(item.name)}>Remove</button>
              </div>
          ))}
        </div>
        <button className= "checkout">Continue to check out</button>
      </div>
  );
}

export default CartPage;
