var React = require('react');
var SessionStore = require('../stores/session');
var FavoriteStore = require('../stores/favorite');

var DogUtil = require('../util/dog_util');
var FavoriteUtil = require('../util/favorite_util');

var Favorites = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return({
      favorites: FavoriteStore.allFavorites()
    })
  },

  componentDidMount: function () {
    this.favListener = FavoriteStore.addListener(this._onChange)
    FavoriteUtil.getAllFavorites();
  },

  componentWillUnmount: function () {
    this.favListener.remove();
  },

  componentWillReceiveProps: function () {
    this._onChange();
  },

  _onChange: function () {
    this.setState({
      favorites: FavoriteStore.allFavorites()
    })
  },

  goToDogShow: function (e) {
    this.context.router.push("/dogs/" + e.currentTarget.dataset.id);
  },

  destroyFavorite: function (e) {
    FavoriteUtil.destroyFavorite(e.currentTarget.dataset.id, this._onChange);
  },


  render: function () {

    var that = this;

    var favToRender = this.state.favorites.map(function (favorite) {
      return(
        <li
          key={favorite.id}
          className="favorites-index-item"
          >
          <div className="favorites-name">{favorite.dog_name}</div>

          <div
            className="favorites-photo"
            data-id={favorite.dog_id}
            onClick={that.goToDogShow}>
            <img src={favorite.dog_photo} />
          </div>

          <button
            className="favorite-destroy"
            data-id={favorite.id}
            onClick={that.destroyFavorite}>
            Remove favorite
          </button>
      </li>
      )
    })

    return(
      <ul className="favorites-index group">
        {favToRender}
      </ul>
    )
  }
});


module.exports = Favorites;
