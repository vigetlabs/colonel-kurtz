module.exports = {
  devtool: 'source-map',

  entry: {
    'colonel-kurtz'  : './src/Colonel.jsx',
    'addons/medium'  : './addons/medium/index.jsx',
    'addons/image'   : './addons/image/index.jsx',
    'addons/youtube' : './addons/youtube/index.jsx',
    'addons/section' : './addons/section/index.jsx'
  },

  output: {
    path: './build/',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },

  /**
   * Externals allow us to not include particular modules in the
   * compiled code. This way we respect whatever version is required
   * by the parent code including Colonel Kurtz
   */
  externals: {
    'react' : 'react',
    'react/addons' : 'react/addons',
    'react/lib/ReactCSSTransitionGroup' : 'react/lib/ReactCSSTransitionGroup',
    'classnames': 'classnames',
    'react-focus-trap': 'react-focus-trap'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.svg'],
    modulesDirectories: [ '.', 'web_modules', 'node_modules', 'src', 'addons', 'assets' ]
  },

  module: {
    loaders: [
      /**
       * Webpack doesn't parse JSON files by default, so we must teach it how:
       */
      {
        test    : /\.json$/,
        loader  : 'json'
      },
      /**
       * Babel is an ES6 Javascript compiler. We use it to compile
       * modern javascript and React JSX.
       * http://babeljs.io
       */
      {
        test    : /\.jsx*$/,
        exclude : /node_modules/,
        loader  : 'babel',
        query   : {
          loose : true,
          stage : 1
        }
      },
      /**
       * Each block has a menu icon. We use the raw loader to
       * inline the SVG content for that icon within the associated
       * React component.
       */
      {
        test    : /\.(svg)$/,
        exclude : /node_modules/,
        loader  : 'raw'
      }
    ]
  }
}
