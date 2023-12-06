module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/prop-types": "off",
    "react-refresh/only-export-components": "off",
    "react-hooks/exhaustive-deps": "off", 
    "no-unused-vars": "off",
    "no-useless-escape": "off",
    "no-case-declarations": "off",
  },
};
