import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import { dependencies as externals } from '../package.json';

const path = require('path');
// console.log(__dirname);
const resolve = (dir: string) => path.resolve(__dirname, '..', dir);

export const mainConfig: Configuration = {
  mode: 'development',
  target: 'electron-main',
  entry: './src/main.ts',
  node: {
    __dirname: true,
  },
  output: {
    path: resolve('dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },

  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
};


export const rendererConfig: Configuration = {
  mode: 'development',
  target: 'electron-renderer',
  entry: './src/renderer/index.ts',
  // externals: [...Object.keys(externals || {})],
  output: {
    path: path.resolve(__dirname, '../dist/renderer'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.less'],
    alias: {
      '@': resolve('src/renderer'),
      '@@': resolve('src'),
    },
  },
  optimization: {},
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: {
              // 'primary-color': 'var(--vscode-button-background)',
              // '@link-color': '#1DA57A',
              // '@border-radius-base': '0px',
              // },
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          // {
          //   loader: 'postcss-loader',
          // },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/renderer/index.html'
    }),
  ],
};
