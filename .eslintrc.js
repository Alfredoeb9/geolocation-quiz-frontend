module.exports = {
  parser: "@babel/eslint-parser",
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard",
    "plugin:react/jsx-runtime",
    "plugin:testing-library/react",
    "plugin:jest/all",
  ],
  parserOptions: {
    sourceType: "module",
  },
  rules: {},
};
