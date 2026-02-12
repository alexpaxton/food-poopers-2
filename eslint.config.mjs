import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier/flat";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

const eslintConfig = [
  ...nextConfig,
  ...nextTypescript,
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        { prefix: "@", rootDir: "src" },
      ],
    },
  },
  prettierConfig,
];

export default eslintConfig;
