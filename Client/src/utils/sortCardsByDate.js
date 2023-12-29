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

export const sortServiceCardByDate = (cardsContent, sortedCards) => {
  cardsContent.forEach((card) => {
    let position = -1;
    card.product_income_date = card.product_income_date.split("T")[0];
    sortedCards.forEach((cardPerDate, index) => {
      cardPerDate.date === card.product_income_date ? (position = index) : "";
    });
    if (position >= 0) {
      sortedCards[position].cards.push(card);
    } else {
      sortedCards.push({ date: card.product_income_date, cards: [card] });
    }
  });
  sortedCards.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return sortedCards;
};

export default sortCardByDate;
