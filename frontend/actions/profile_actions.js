var Dispatcher = require('../dispatcher/dispatcher');
var ProfileConstants = require('../constants/profile_constants');

module.exports = {
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: ProfileConstants.CURRENT_USER_RECEIVED,
      user: user
    })
  }
};
