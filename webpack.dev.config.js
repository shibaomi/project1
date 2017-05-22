const path = require('path');
const webpack = require("webpack");
let config = require('./webpack.common.config')

var proxyInterface = ['/floor/api',
  '/goods/',
  '/memberapi/',
  '/questionApi/',
  '/storeapi',
  '/loginapi',
  '/cartapi',
  '/orderapi',
  '/address',
  '/groupPurchaseApi',
  '/flashSaleApi',
  '/invoiceapi',
  '/reviews/api',
  '/couponApi',
  '/predepositApi',
  '/circleApi',
  '/contentExhibitionApi',
  '/wxh5pay/api',
  '/alipayh5/api'
];
var proxy = {};
proxyInterface.forEach(function(item) {
  proxy[item] = {
    //target: 'http://testbbc.leimingtech.com',
    target: 'http://222.128.107.235:8989/leimingtech-front',
    //target: 'http://222.128.107.239:8999/front',
    // target: 'http://222.128.107.235:8999/front',
    changeOrigin: true,
    logLevel: 'debug'
  };
});

config = Object.assign(config, {
  devtool: '#eval-source-map', // for debug es6 source
  // devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    port: 3000,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: proxy
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = config
