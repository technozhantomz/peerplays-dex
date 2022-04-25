module.exports = {
  map: false,
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: 'last 10 versions',
      stage: 0,
    },
    'cssnano': {}
  }
}
