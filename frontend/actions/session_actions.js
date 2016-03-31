var Dispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');


module.exports = {
  receiveCurrentUser: function (user) {
    Dispatcher.dispatch({
      actionType: SessionConstants.CURRENT_USER_RECEIVED,
      user: user
    })
  },

  logout: function () {
    Dispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};
