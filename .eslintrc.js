// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  globals: {
    module: "readonly",
    process: "readonly",
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __DEV__: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "jsx-a11y", "import", "react-hooks"],
  rules: {
    "no-undef": "error",
    "import/prefer-default-export": "off",
    "global-require": "off",
    "no-unused-vars": "warn",
    "no-console": "warn",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off",
    "no-duplicate-imports": ["off"],
    "react/jsx-uses-react": 1,
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-key": "off",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src",
      },
    },
  },
};
