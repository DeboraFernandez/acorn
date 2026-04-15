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
            '@hooks': './src/hooks',
            '@lib': './lib',
            '@components': './src/components',
            '@screens': './src/screens',
            '@themes': './src/theme',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};
