import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api/index.js";

function Home() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDecks() {
      try {
        setLoading(true);
        const loadedDecks = await listDecks();
        setDecks(loadedDecks);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving decks:", error);
        setError(error);
        setLoading(false);
      }
    }
    loadDecks();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm("Are you sure you want to delete this deck? This action cannot be undone.")) {
      try {
        await deleteDeck(deckId);
        setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error("Error deleting deck:", error);
        setError(error);
      }
    }
  };

  const handleView = (deckId) => {
    navigate(`/decks/${deckId}`);
  };

  const handleStudy = (deckId) => {
    navigate(`/decks/${deckId}/study`);
  };

  const createDeck = () => {
    navigate(`/decks/new`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error retrieving decks: {error.message}</p>;
  }

  const deckLinks = decks.map((deck) => (
    <div className="deck-preview" key={deck.id}>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h3 onClick={() => handleView(deck.id)}>{deck.name}</h3>
            <p>{(deck.cards || []).length} cards</p>
          </div>
          <p>{deck.description}</p>
          
          <button className="btn btn-secondary mr-2" onClick={() => handleView(deck.id)}>View</button>
          <button className="btn btn-primary mr-2" onClick={() => handleStudy(deck.id)}>Study</button>
          <button className="btn btn-danger" onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
        </div>
      </div>
    </div>
  ));

  return (
    <section>
      <div>
        <button className="btn btn-secondary mb-2" onClick={createDeck}>+Create Deck</button>
      </div>
      <div>{deckLinks}</div>
    </section>
  );
}

export default Home;
