var FavoriteConstants = require('../constants/favorite_constants.js');
var Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
  addedFavorite: function (favorite) {
    Dispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITE_RECEIVED,
      favorite: favorite
    });
  },

  allFavoritesRetrieved: function (favorites) {
    Dispatcher.dispatch({
      actionType: FavoriteConstants.FAVORITES_RECEIVED,
      favorites: favorites
    });
  }

};
