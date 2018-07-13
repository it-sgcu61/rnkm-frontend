var admin = require('firebase-admin');


var info = require('./info');
var operation = require('./operation');
var account = require('./account');



// var db = admin.database();


exports.getHouses = info.getHouses;
exports.getPersonInfo = info.getPersonInfo;
// exports.getPersonInfoOld = info.getPersonInfoOld;

// operation related to changing person
exports.movePerson = operation.movePerson;
exports.confirmHouse = operation.confirmHouse;
exports.onHouseConfirmed = operation.onHouseConfirmed;
exports.ADMIN_lockall = operation.ADMIN_lockAll;

// operations related to accounts
exports.login = account.login;
exports.logout = account.logout;
// exports.loginOld = account.loginOld; 
exports.register = account.register;
// exports.initPerson = account.initPerson
exports.onPersonDelete = account.onPersonDelete;
// exports.ADMIN_resetPassword = account.ADMIN_resetPassword;

