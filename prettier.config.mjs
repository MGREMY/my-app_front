/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  bracketSameLine: true,
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 100,
  proseWrap: 'always',
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    '^~/(.*)$',
    '^[.]',
    '^@my-app.*',
    '^@libs/*',
    '',
    '(@ng-icon)',
    '(@ngx-translate)',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '<BUILTIN_MODULES>',
  ],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

export default config;
