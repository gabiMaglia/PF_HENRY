const sortCardByDate = (cardsContent, sortedCards) => {
  cardsContent.forEach((card) => {
    let position = -1;
    sortedCards.forEach((cardPerDate, index) => {
      cardPerDate.date === card.date ? (position = index) : "";
    });
    if (position >= 0) {
      sortedCards[position].cards.push(card);
    } else {
      sortedCards.push({ date: card.date, cards: [card] });
    }
  });
  return sortedCards;
};

export default sortCardByDate;
