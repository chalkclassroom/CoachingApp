module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'project': './tsconfig.json',
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'prettier'
  ],
  'settings': {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use,
                                         // default to 'createReactClass'
      'pragma': 'React',  // Pragma to use, default to 'React'
      'version': 'detect', // React version. 'detect' automatically picks the version you have installed.
                           // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                           // default to latest and warns if missing
                           // It will default to 'detect' in the future
      'flowVersion': '0.53' // Flow version
    },
    'propWrapperFunctions': [
        // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
        'forbidExtraProps',
        {'property': 'freeze', 'object': 'Object'},
        {'property': 'myFavoriteWrapper'}
    ],
    'linkComponents': [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      {'name': 'Link', 'linkAttribute': 'to'}
    ]
  },
  'rules': {
    "no-invalid-this": 0,
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "prettier/prettier": "error"
  },
};
