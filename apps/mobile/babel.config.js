module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@assets': './assets',
            '@hooks': './hooks',
            '@hooks': './lib',
            '@components': './src/components',
            '@screens': './src/screens',
            '@themes': './src/themes',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
