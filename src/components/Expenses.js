import "../App.css";
import React, { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";

function Expenses() {
  const [cards, setCards] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("https://api.pokemontcg.io/v2/cards");
        const jsonData = await response.json();
        setCards(jsonData.data);

        // Determine the maximum price from the fetched cards
        const prices = jsonData.data.map(
            (item) => item.cardmarket?.prices?.averageSellPrice || 0
        );
        const highestPrice = Math.max(...prices);
        setMaxPrice(highestPrice);
        setSelectedPrice(highestPrice); // Default to the highest price
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  // Filter cards based on the selected price
  const filteredCards = cards.filter(
      (item) =>
          (item.cardmarket?.prices?.averageSellPrice || 0) <= selectedPrice
  );

  return (
      <div>
        <div className="filter-container">
          <label htmlFor="price-slider">Max Price: {selectedPrice}€</label>
          <input
              id="price-slider"
              type="range"
              min="0"
              max={maxPrice + 1}
              step="1"
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
          />
        </div>

        <div className="items">
          {filteredCards.map((item, index) => (
              <ExpenseItem
                  name={item.name}
                  price={item.cardmarket?.prices?.averageSellPrice || 0}
                  picture={item.images.small}
                  key={index}
              />
          ))}
        </div>
      </div>
  );
}

export default Expenses;
