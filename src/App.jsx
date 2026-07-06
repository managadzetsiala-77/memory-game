import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Difficulty from "./components/Difficulty";
import Header from "./components/Header";
import createCards from "./data/createCards";
import shuffle from "./itils/shuffle";

export default function App() {
  const [cards, setCards] = useState(shuffle(createCards(10)));
 const [difficulty, setDifficulty] = useState(10);

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
 
  const [win, setWin] = useState(false);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const makeGame = (size) => {
    setDifficulty(size);
    setCards(shuffle(createCards(size)));

    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (!firstCard || !secondCard) return;

    setDisabled(true);

    if (firstCard.number === secondCard.number) {
      setCards((prev) =>
        prev.map((card) =>
          card.number === firstCard.number ? { ...card, matched: true } : card,
        ),
      );

      resetTurn();
    } else {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, opened: false }
              : card,
          ),
        );

        resetTurn();
      }, 1000);
    }
  }, [secondCard]);

  return (
    <div className="container">
      <Header />
      <Difficulty makeGame={makeGame} />
      <Board
        cards={cards}
        setCards={setCards}
        firstCard={firstCard}
        setFirstCard={setFirstCard}
        secondCard={secondCard}
        setSecondCard={setSecondCard}
        disabled={disabled}
        setDisabled={setDisabled}
      />
    </div>
  );
}
