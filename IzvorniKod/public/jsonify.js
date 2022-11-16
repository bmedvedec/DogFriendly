var fs = require('fs');
var text = fs.readFileSync('password_blacklist.txt', 'utf8');
var lines = text.split('\n');
var json = JSON.stringify(lines);
fs.writeFileSync('password_blacklist.json', json, 'utf8');