#!/usr/bin/env node
'use strict';

var raw     = process.argv[2];
var migrate = require('../lib/migrate')
var json;

if (!raw.trim()) {
  process.exit(1);
}

json = JSON.parse(raw)

console.log(JSON.stringify(migrate(json)))
