/**
 * Jest Setup Script
 *
 * This script runs before every test, which is useful for polyfills
 * and other global setup behavior
 */

/**
 * Neccessary polyfills
 */

Object.assign = require('object-assign')
require('array.prototype.find')
