const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      _base: path.resolve(__dirname, 'src'),
      _helpers: path.resolve(__dirname, 'src/components/helpers'),
      _features: path.resolve(__dirname, 'src/components/features'),
      _views: path.resolve(__dirname, 'src/components/views'),
      _routes: path.resolve(__dirname, 'src/components/routes'),
      _layouts: path.resolve(__dirname, 'src/components/layouts'),
      _store: path.resolve(__dirname, 'src/store'),
      _services: path.resolve(__dirname, 'src/services'),
    },
  };
  return config;
};