var FavoriteActions = require('../actions/favorite_actions');
var FavoriteStore = require('../stores/favorite');

FavoriteUtil = {

  getAllFavorites: function () {
    $.ajax({
      url: "api/favorites",
      type: "GET",
      dataType: "json",
      success: function (favorites) {
        FavoriteActions.allFavoritesRetrieved(favorites)
      },
      error: function () {
        console.log("error in favorites index");
      }
    });
  },

  createFavorite: function (params) {
    $.ajax({
      url: "api/favorites",
      type: "POST",
      dataType: "json",
      data: params,
      success: function (favorite) {
        FavoriteActions.addedFavorite(favorite)
      },
      error: function () {
        console.log("error in favorites post");
      }
    });
  },

  destroyFavorite: function (favoriteId, callback) {
    $.ajax({
      url: "api/favorites/" + favoriteId,
      type: "DELETE",
      dataType: "json",
      success: function (favorite) {
        FavoriteActions.removedFavorite(favorite);
      },
      error: function () {
        console.log("error in favorites destroy");
      }
    });
  }

};

module.exports = FavoriteUtil;
