
// De segundos a ano, mes, dia, hora, minutos

module.exports = (date) => {
  const formatoCompleto = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return formatoCompleto
};
