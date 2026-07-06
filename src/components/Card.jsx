


export default function Card({card, handleClick}) {
  return (
    <div className="card" onClick={() => handleClick(card)}>



{card.opened || card.matched ? card.number : ""}
        
    </div>
  )
}
