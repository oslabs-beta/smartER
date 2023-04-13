"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
exports.default = {
    entry: ['./client/index.tsx'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        port: 8080,
        historyApiFallback: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: {
            '/api/': 'http://localhost:9001/',
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                include: [path.resolve(__dirname, 'client')],
                use: 'babel-loader',
            },
            {
                test: /.(scss|sass|css)$/,
                exclude: /node_modules\/(?!@?reactflow).*/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [new html_webpack_plugin_1.default({ template: './index.html' })],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
};
