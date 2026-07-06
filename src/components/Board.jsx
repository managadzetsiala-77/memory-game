import Card from "./Card";

export default function Board({
  cards,
  setCards,
  firstCard,
  setFirstCard,
  secondCard,
  setSecondCard,
  disabled,
  setDisableds,
}) 
{

const handleClick = (card) => {
  if (disabled) return;  
  if(card.opened || card.matched)  return 
  const updated = cards.map((c) =>
      c.id === card.id ? { ...c, opened: true } : c
    );

    setCards(updated);

    if (!firstCard) {
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
