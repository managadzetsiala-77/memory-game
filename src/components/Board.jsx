import Card from "./Card";

export default function Board({
  cards,
  setCards,
  firstCard,
  setFirstCard,
  secondCard,
  setSecondCard,
  disabled,
  setIsPlaying,
}) {
  const handleClick = (card) => {
    if (disabled) return;
    if (card.opened || card.matched) return;
    setIsPlaying(true)
    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, opened: true } : c,
    );

    setCards(updated);

    if (!firstCard) {
      setIsPlaying(true);
      setFirstCard(card);
    } else {
      setSecondCard(card);
    }
  };

  return (
    <div className="board">
      {cards.map((card) => (
        <Card key={card.id} card={card} handleClick={handleClick} />
      ))}
    </div>
  );
}
