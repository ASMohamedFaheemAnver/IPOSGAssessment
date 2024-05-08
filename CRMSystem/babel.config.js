module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@src': './src',
          '@providers': './src/providers',
          '@redux': './src/redux',
          '@ui': './src/ui',
          '@components': './src/components',
          '@constants': './src/constants',
          '@themes': './src/themes',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
          '@typography': './src/typography',
          '@assets': './src/assets',
        },
      },
    ],
  ],
};
