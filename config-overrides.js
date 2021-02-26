const path = require('path');
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      _config: path.resolve(__dirname, 'src/config.ts'),
      _types: path.resolve(__dirname, 'src/@types'),
      _helpers: path.resolve(__dirname, 'src/components/helpers'),
      _slices: path.resolve(__dirname, 'src/components/slices'),
      _views: path.resolve(__dirname, 'src/components/views'),
      _routes: path.resolve(__dirname, 'src/components/routes'),
      _routers: path.resolve(__dirname, 'src/components/routers'),
      _layouts: path.resolve(__dirname, 'src/components/layouts'),
      _store: path.resolve(__dirname, 'src/store'),
      _services: path.resolve(__dirname, 'src/services'),
    },
  };
  return config;
};
