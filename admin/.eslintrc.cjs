module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    },
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "semi": ["error", "always"],
    "no-console": "error",
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};
