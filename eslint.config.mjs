import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { prefix: "@", rootDir: "src" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Libraries (external packages)
            ["^(?!@/)"],
            // Utilities
            ["^@/utils", "^@/lib"],
            // Shared components
            ["^@/components/shared"],
            // Local components
            ["^@/components"],
            // Constants
            ["^@/constants"],
            // Types
            ["^@/types"],
            // Side-effect imports (e.g. CSS)
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
  prettierConfig,
];

export default eslintConfig;
