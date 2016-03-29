var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');

var UserStore = new Store(AppDispatcher);


var _user = [];

UserStore.CurrentUser = function () {

};

//on dispatch, reset current user to result of ajax call before emitting change.

module.exports = UserStore;
