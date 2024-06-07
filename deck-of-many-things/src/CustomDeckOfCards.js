// src/CustomDeckOfCards.js
import React, { useState, useEffect } from 'react';
import cardData from './cards.json'; // Import the card data

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const CustomDeckOfCards = () => {
  const [deck, setDeck] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [numCardsToDraw, setNumCardsToDraw] = useState(1);

  useEffect(() => {
    setDeck(shuffleDeck([...cardData])); // Shuffle the deck on load
  }, []);

  const drawCards = () => {
    if (numCardsToDraw <= deck.length) {
      const cardsToDraw = deck.slice(0, numCardsToDraw);
      const remainingDeck = deck.slice(numCardsToDraw);
      setDeck(remainingDeck);

      const returnableCards = cardsToDraw.filter(card => card.returnable);
      setDeck(shuffleDeck([...remainingDeck, ...returnableCards]));

      setDrawnCards(cardsToDraw);
      setCurrentCardIndex(0);
    } else {
      alert('Not enough cards in the deck to draw the specified number.');
    }
  };

  const showNextCard = () => {
    if (currentCardIndex < drawnCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setDrawnCards([]);
      setCurrentCardIndex(-1);
    }
  };

  return (
    <div>
      <h1>Draw Cards from a Custom Deck</h1>
      {currentCardIndex === -1 && (
        <>
          <input
            type="number"
            value={numCardsToDraw}
            onChange={(e) => setNumCardsToDraw(Number(e.target.value))}
            min="1"
            max={deck.length}
          />
          <button onClick={drawCards}>Draw Cards</button>
        </>
      )}
      {drawnCards.length > 0 && currentCardIndex !== -1 && (
        <div className="card">
          <h3>{drawnCards[currentCardIndex].name}</h3>
          <img src={drawnCards[currentCardIndex].image} alt={drawnCards[currentCardIndex].name} />
          <p>{drawnCards[currentCardIndex].description}</p>
        </div>
      )}
      {drawnCards.length > 0 && currentCardIndex !== -1 && (
        <button onClick={showNextCard}>
          {currentCardIndex < drawnCards.length - 1 ? 'Show Next Card' : 'End Drawing'}
        </button>
      )}
      <p>{deck.length} cards remaining in the deck.</p>
    </div>
  );
};

export default CustomDeckOfCards;
