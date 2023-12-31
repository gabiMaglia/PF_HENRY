function getFirstLetters(text) {
  if (text) {
    const words = text.split(" ");

    const firstLetters = words.map((word) => word.charAt(0));

    const result = firstLetters.join("");

    return result;
  } else {
    return "";
  }
}

export default getFirstLetters;
