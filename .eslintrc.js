module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  plugins: ["jest"],
  extends: [
    "plugin:vue/essential",
    "@vue/prettier",
    "@vue/typescript",
    "plugin:jest/recommended",
    "plugin:jest/style"
  ],
  rules: {
    "no-console": "off",
    "no-debugger": "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
