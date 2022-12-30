const {mode} = require ('webpack-nano/argv');
const {merge} = require ('webpack-merge');

const parts = require ('./webpack.parts');
const cssLoaders = [parts.autoprefix (), parts.tailwind ()];

const commonConfig = merge ([
  parts.clean (),
  {entry: ["./src"]},
  parts.extractCSS ({loaders: cssLoaders}),
  parts.page ({title: "Demo"}),
  parts.loadImages ({limit: 15000}),
  parts.loadJavaScript (),
  parts.setFreeVariable("HELLO", "hello from config"),
]);

const productionConfig = merge ([
  {
    output: {
      chunkFilename: "[name].[contenthash].js",
      filename: "[name].[contenthash].js",
      assetModuleFilename: "[name].[contenthash][ext][query]",
    },
  },
  parts.minifyJavaScript (),
  parts.minifyCSS ({options: {preset: ["default"]}}),
  parts.eliminateUnusedCSS (),
  parts.generateSourceMaps ({type: "source-map"}),
  parts.attachRevision (),
  {optimization: {splitChunks: {chunks: "all"}}},
]);

const developmentConfig = merge ([
  {entry: ['webpack-plugin-serve/client']},
  parts.devServer ()
]);

const getConfig = (mode) =>
{
  process.env.NODE_ENV = mode;
  switch (mode)
  {
    case "production":
      return merge (commonConfig, productionConfig, {mode});
    case "development":
      return merge (commonConfig, developmentConfig, {mode});
    default:
      throw new Error (`Trying to use an unknown mode, ${mode}`);
  }
};

module.exports = getConfig (mode);

// End of webpack.config.js
