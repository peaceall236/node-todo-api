const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decode = jwt.verify(token, '123abc');
console.log(decode);
// var message = "Peace";
// var hash = SHA256(message).toString();

// console.log(message);
// console.log(hash);

// var data = {
//     id: 4,
// }
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + '123abc').toString()
// }