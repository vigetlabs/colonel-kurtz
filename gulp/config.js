var bundlePath = "./colonel-kurtz/";
var bundleDest = './build/';

module.exports = {
  browserify: {
    debug: false,
    extensions: ['.js', '.jsx'],
    transform: [
      [
        "reactify",
        {
          stripTypes: true
        }
      ],
      [
        "reactify",
        {
          es6: true
        }
      ],
      "uglifyify"
    ],
    bundleConfigs: [
      {
        entries: bundlePath + 'index.js',
        dest: bundleDest,
        outputName: 'index.js'
      }
    ]
  }
};
