import prettier from "eslint-config-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,

      // Enforce sorted imports
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. React first
            ["^react$", "^react-dom"],
            // 2. External packages
            ["^@?\\w"],
            // 3. Internal store
            ["^.*/store"],
            // 4. Internal components
            ["^.*/components"],
            // 5. Relative imports
            ["^\\."],
            // 6. CSS last
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  prettier,
];
