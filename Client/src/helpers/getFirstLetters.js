function getFirstLetters(text) {
  const words = text.split(" ");

  const firstLetters = words.map((word) => word.charAt(0));

  const result = firstLetters.join("");

  return result;
}

export default getFirstLetters;
