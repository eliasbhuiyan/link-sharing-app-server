var jwt = require('jsonwebtoken');

var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
module.exports = token