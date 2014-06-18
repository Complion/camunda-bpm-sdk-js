'use strict';

var request = require('superagent');
var Events = require('./events');


/**
 * HttpClient
 * @exports CamSDK.HttpClient
 */

/**
 * HttpClient
 * @class
 * @classdesc A HTTP request abstraction layer to be used in node.js / browsers environments.
 */
var HttpClient = function(config) {
  config = config || {};

  if (!config.baseUrl) {
    throw new Error('HttpClient needs a `baseUrl` configuration property.');
  }

  Events.attach(this);

  this.config = config;
};


/**
 * Performs a POST HTTP request
 */
HttpClient.prototype.post = function(data, options) {
  data = data || {};
  options = options || {};

  var url = this.config.baseUrl + (options.path ? '/'+ options.path : '');
  var req = request
    .post(url);
  req.send(data);
  req.end(options.done);
};



/**
 * Performs a GET HTTP request
 */
HttpClient.prototype.get = function(data, options) {
  data = data || {};
  options = options || {};
  options.done = options.done || function() {};

  var url = this.config.baseUrl + (options.path ? '/'+ options.path : '');
  var req = request
    .get(url);

  req.end(function(err, response) {
    if (err || !response.ok) {
      // ...
    }

    console.info('response for '+ url, !!err, [[response]]);
    // if () {

    // }

    options.done.apply(this, arguments);
  });
};



/**
 * Performs a PUT HTTP request
 */
HttpClient.prototype.put = function(data, options) {
  data = data || {};
  options = options || {};
};



/**
 * Performs a DELETE HTTP request
 */
HttpClient.prototype.del = function(data, options) {
  var instance = this.instance;
  data = data || {};
  options = options || {};
};

module.exports = HttpClient;
