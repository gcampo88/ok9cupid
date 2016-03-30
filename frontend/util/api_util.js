var ProfileActions = require('../actions/profile_actions');

ApiUtil = {
  fetchCurrentUser: function (id) {
    $.ajax({
      url: "api/users/" + id,
      type: "GET",
      dataType: "json",
      success: function (user) {
        ProfileActions.receiveCurrentUser(user);
      },
      error: function () {
        console.log("failed AJAX current user request");
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
        // debugger;
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
