const { mode } = require ('webpack-nano/argv');
const { merge } = require ('webpack-merge');
const parts = require ('./webpack.parts');

const commonConfig = merge([
    { entry: ["./src"] },
    parts.page({ title: "Demo" }),
]);

const productionConfig = merge([]);

const developmentConfig = merge([
    { entry: ['webpack-plugin-serve/client'] },
    parts.devServer()
]);

const getConfig = (mode) => {
    process.env.NODE_ENV = mode;
    switch (mode) {
        case "production":
            return merge (commonConfig, productionConfig, { mode });
        case "development":
            return merge (commonConfig, developmentConfig, { mode });
         default:
            throw new Error (`Trying to use an unknown mode, ${mode}`);
    }
};

//const { MiniHtmlWebpackPlugin } = require ("mini-html-webpack-plugin");
//const { WebpackPluginServe } = require ("webpack-plugin-serve");

module.exports = getConfig (mode);
    /*{
    watch: mode == 'development',
    entry: ['./src', 'webpack-plugin-serve/client'],
    mode,
    plugins: [
        new MiniHtmlWebpackPlugin({ context: { title: "Demo" } }),
        new WebpackPluginServe ({
            port: parseInt (process.env.PORT, 10) || 8080,
            static: "./dist",
            liveReload: true,
            waitForBuild: true,
        })
    ],
};
     */

// End of webpack.config.js
