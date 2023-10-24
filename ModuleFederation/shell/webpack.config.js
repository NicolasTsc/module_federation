const {withModuleFederationPlugin, share } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  // remotes: {
  //   "mfe1": "http://localhost:5001/remoteEntry.js",
  //   "mfe2": "http://localhost:5002/remoteEntry.js",
  // },

  shared: share({
    "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  })

});
