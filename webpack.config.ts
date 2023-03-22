import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
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
    proxy: { '/api': 'http://localhost:3000/' },
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
        test: /.css$/,
        exclude: /node_modules\/(?!@?reactflow).*/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
};
