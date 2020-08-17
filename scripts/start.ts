import { cyan, green } from 'chalk';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import * as config from './webpack.config';
import * as ProgressBarPlugin from 'progress-bar-webpack-plugin';
import { startElectron } from './utils/startElectron';

const port = Number(process.env.PORT) || 8848;
const host = process.env.HOST || '127.0.0.1';

if (!config.rendererConfig.plugins) {
  config.rendererConfig.plugins = [];
}

config.rendererConfig.plugins.push(
  new ProgressBarPlugin({
    format: `Building [:bar] ${green.bold(':percent')} (:elapsed seconds)`,
    clear: true,
    total: 100,
  }),
);

const mainCompiler = webpack(config.mainConfig);

mainCompiler.hooks.done.tap('done', () => {
  // console.log(
  //   cyan('Start main dev mode'),
  // );

  startElectron('dist/main.js');
});

mainCompiler.run((err, stats) => {
  // if (err) {
  //   console.log(err);
  // } else {
  //   console.log(stats);
  // }
  // console.log('Start building main');
});

const rendererCompiler = webpack(config.rendererConfig);
rendererCompiler.hooks.afterCompile.tap('afterCompile', () => {
  // console.log(
  //   cyan(`Start renderer dev mode at http://${green(host)}:${green(port)}`),
  // );
});

const rendererServer = new WebpackDevServer(rendererCompiler, {
  contentBase: '../dist/renderer/index.html',
  hot: true,
  // quiet: true,
  // noInfo: false,
  // stats: 'none',
  stats: 'errors-only',
});

rendererServer.listen(port, host, error => {
  if (error) {
    return console.log(error);
  }
  // clearConsole();
  // console.log(
  //   cyan(`Start renderer dev mode at http://${green(host)}:${green(port)}`),
  // );
});
