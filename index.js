const fs = require('fs');

const config = JSON.parse(fs.readFileSync('package.json')).config;
require('./src/app')(config);
