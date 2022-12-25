const { WebpackPluginServe } = require ('webpack-plugin-serve');
const { MiniHtmlWebpackPlugin } = require ('mini-html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

exports.devServer = () => ({
    watch: true,
    plugins: [
        new WebpackPluginServe ({
            port: parseInt (process.env.PORT, 10) || 8080,
            static: './dist', // Expose if output.path changes
            liveReload: true,
            waitForBuild: true
        })
    ]
});

exports.extractCSS = ({ options = {}, loaders = [] } = {}) => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader, options },
                        "css-loader",
                    ].concat (loaders),
                    sideEffects: true,
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin ({ filename: "[name].css" })
        ]
    };
};

exports.page = ({ title }) => ({
    plugins: [new MiniHtmlWebpackPlugin ({ context: { title } })]
});

exports.loadCSS = () => ({
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
        ],
    },
});

exports.tailwind = () => ({
    loader: "postcss-loader",
    options: {
        postcssOptions: { plugins: [require ("tailwindcss")()] },
    },
});

// End of webpack.parts.js
