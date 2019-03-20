const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

console.log(`运行环境：${process.env.NODE_ENV}`);

module.exports = {
  parallel: true,
  chainWebpack: (config) => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap((options) => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        });
        return options;
      });
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      config.output.filename = 'js/[name].[contenthash:8].js';
      config.output.chunkFilename = 'js/[name].[contenthash:8].js';
    }
  },
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV === 'development',
  css: {
    extract: ['production', 'test'].includes(process.env.NODE_ENV),
    loaderOptions: {
      sass: {
        data: '@import "./src/assets/css/_config.scss";',
      },
    },
  },
};
