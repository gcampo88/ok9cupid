var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');

var UserStore = new Store(AppDispatcher);


var _user = [];

UserStore.currentUser = function () {
  return _user[0];
}

UserStore.receiveCurrentUser = function (user) {
  _user = [];
  _user.push(user);
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ProfileConstants.CURRENT_USER_RECEIVED:
      UserStore.receiveCurrentUser(payload.user);
      UserStore.__emitChange();

      break;

  }
}

//on dispatch, reset current user to result of ajax call before emitting change.

module.exports = UserStore;
