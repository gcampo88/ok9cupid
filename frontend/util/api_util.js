var ProfileActions = require('../actions/profile_actions');
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

  logout: function () {
    $.ajax({
      url: "api/session",
      type: "DELETE",
      dataType: "json",
      success: function () {
        SessionActions.logout();
      },
      error: function () {
        console.log("error logging out in ajax")
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
        console.log("failed create ajax call");
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
        ProfileActions.receiveCurrentUser(user);
        console.log("success on patch req!");
      },
      error: function () {
        console.log("failed AJAX patch profile request");
      }
    });
  }
};

module.exports = ApiUtil;
