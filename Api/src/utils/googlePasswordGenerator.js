function generateGoogleValidPassword(length = 12) {
  // Lista de caracteres válidos para contraseñas de Google
  const validCharacters = [
    "abcdefghijklmnopqrstuvwxyz",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "0123456789",
    "!@#$%^&*()-_=+[{]}\\|;:'",
  ];

  // Generar una contraseña aleatoria de 8 caracteres
  const password = Array(length)
    .fill(null)
    .map(() => validCharacters[Math.floor(Math.random() * validCharacters.length)]);

  // Devolver la contraseña aleatoria
  return password.join("").slice(0, length );
}

module.exports = generateGoogleValidPassword 