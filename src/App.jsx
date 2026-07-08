import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import Difficulty from "./components/Difficulty";
import Header from "./components/Header";
import createCards from "./data/createCards";
import shuffle from "./utils/shuffle";

export default function App() {
  const [cards, setCards] = useState(shuffle(createCards(10)));
  const [difficulty, setDifficulty] = useState(10);

  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [win, setWin] = useState(false);
  const [moves, setMoves] = useState(0);

  const [seconds, setSeconds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const makeGame = (size = difficulty) => {
    setDifficulty(size);
    setCards(shuffle(createCards(size)));

    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
    setWin(false);
    setMoves(0);
    setSeconds(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!firstCard || !secondCard) return;
    setMoves((prev) => prev + 1);

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
  useEffect(() => {
    const isWin = cards.every((card) => card.matched);
    if (cards.length && isWin) {
      setWin(true);
    }
  }, [cards]);

  useEffect(() => {
    if (!isPlaying || win) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, win]);

  return (
    <div className="container">
      <Header moves={moves} seconds={seconds} />
      <Difficulty makeGame={makeGame} />
      <button onClick={() => makeGame()}>  Restart Game
</button>
      {win && <div className="win">🎉 You Win!</div>}
      <Board
        cards={cards}
        setCards={setCards}
        firstCard={firstCard}
        setFirstCard={setFirstCard}
        secondCard={secondCard}
        setSecondCard={setSecondCard}
        disabled={disabled}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}
