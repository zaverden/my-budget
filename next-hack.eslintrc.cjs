// ! NOTE: next-js requires config to be named `.eslintrc.json`
// ! So I created this `.cjs` config and used it in `.json`
// ! Guess what? It worked!

// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("eslint-config-tsap/patch/modern-module-resolution");

/** @type { import('eslint').Linter.Config } */
module.exports = {
  parserOptions: { tsconfigRootDir: __dirname },
  extends: ["next/core-web-vitals", "tsap"],
  rules: {
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
  },

  overrides: [
    {
      files: ["pages/**/*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
