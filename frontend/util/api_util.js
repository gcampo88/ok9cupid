var SessionActions = require('../actions/session_actions');
var SessionStore = require('../stores/session');


ApiUtil = {
  fetchCurrentUser: function (completion) {
    $.ajax({
      url: "api/session",
      type: "GET",
      dataType: "json",
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
      },
      complete: function () {
        completion && completion();
      }
    });
  },

  login: function (credentials, callback) {
    $.ajax({
      url: "api/session",
      type: "POST",
      dataType: "json",
      data: credentials,
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback && callback();
      },
      error: function () {
        alert("Invalid credentials.");
      }
    });
  },

  logout: function (callback) {
    $.ajax({
      url: "api/session",
      type: "DELETE",
      dataType: "json",
      success: function () {
        callback && callback();
        SessionActions.logout();
      },
      error: function () {
      }
    });
  },

  createUser: function (userInfo, callback) {
    $.ajax({
      url: "api/users",
      type: "POST",
      dataType: "json",
      data: userInfo,
      contentType: false,
      processData: false,
      success: function (currentUser) {
        SessionActions.receiveCurrentUser(currentUser);
        callback && callback();
      },
      error: function () {
      }
    });
  },

  updateUserProfile: function (formData, id) {
    $.ajax({
      url: "api/users/" + id,
      type: "PATCH",
      dataType: "json",
      processData: false,
      contentType: false,
      data: formData,
      success: function (user) {
        SessionActions.receiveCurrentUser(user);
      },
      error: function () {
      }
    });
  }
};

module.exports = ApiUtil;
