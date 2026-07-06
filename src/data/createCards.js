export default function createCards(totalCards) {
  const cards = [];
  const pairs = totalCards / 2;

  for (let i = 1; i <= pairs; i++) {
    cards.push({
      id: crypto.randomUUID(),
      number: i,
      opened: false,
      matched: false,
    });

    cards.push({
      id: crypto.randomUUID(),
      number: i,
      opened: false,
      matched: false,
    });
  }

  return cards;
}