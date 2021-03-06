/**
 * Main application routes
 */

'use strict';
var stormpathExpressSdk = require('stormpath-sdk-express');
var errors = require('./components/errors');
var path = require('path');
var spMiddleware = stormpathExpressSdk.createMiddleware();
module.exports = function(app) {
  spMiddleware.attachDefaults(app);
  // Insert routes below
  app.use('/api/things', spMiddleware.authenticate, require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
