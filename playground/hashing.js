const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = "alliance";
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedpass = "$2a$10$Qxa1L/tMawTWs/ZWB2BD8.F39lUcxhUYkc7nchmpNV4LDXcq5lySS";
bcrypt.compare(password, hashedpass, (err, res) => {
    console.log(res);
});
// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decode = jwt.verify(token, '123abc');
// console.log(decode);
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