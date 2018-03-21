const path = require("path");
const slsw = require("serverless-webpack");
//const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
    /*
    entry: {
        create: './functions/create.js',
        delete: './functions/delete.js',
        list: './functions/list.js',
        update: './functions/update.js',
        get: './functions/get.js'
    },
    */
  target: "node",
  devtool: "false",
  // Exclude some node dependencies 
  externals: [/aws-sdk/,/uuid/],
  //externals: [nodeExternals()],    
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: path.resolve(__dirname,'functions'),
        exclude: /node_modules/,
        query: {
          presets: [
            [
              'env',
              {
                target: { node: '6.10' }, // Node version on AWS Lambda
                useBuiltIns: true,
                modules: false,
                loose: true,
              },
            ],
            'stage-3',
          ],
        },          
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs', //  export
    path: path.join(__dirname, 'build'), //default is .webpack
    filename:'[name].js' // default is '[name].js'
  }    
};
