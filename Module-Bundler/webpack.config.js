const path = require('path');

module.exports = {
   mode: 'production',
   entry: './src/server.ts',
   target: "node",
   externals: [nodeExternals()],

   output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'main.js',
   },
   resolve: {
       extensions: ['.ts', '.js'],
   },
   module: {
       rules: [
           {
               test: /\.tsx?/,
               use: 'ts-loader',
               exclude: /node_modules/
           }
       ]
   }
}
