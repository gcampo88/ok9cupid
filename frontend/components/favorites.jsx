var React = require('react');
var SessionStore = require('../stores/session');
var FavoriteStore = require('../stores/favorite');
var DogUtil = require('../util/dog_util');

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

  _onChange: function () {
    this.setState({
      favorites: FavoriteStore.allFavorites()
    })
  },

  goToDogShow: function (e) {
    // DogUtil.fetchSingleDog(e.currentTarget.value);
    this.context.router.push("/dogs/" + e.currentTarget.value);
  },

  render: function () {

    var that = this;

    var favToRender = this.state.favorites.map(function (favorite) {
      return(
        <li
          key={favorite.id}
          value={favorite.dog_id}
          className="favorites-index-item"
          onClick={that.goToDogShow}
          >
          <div className="favorites-name">{favorite.dog_name}</div>
          <div className="favorites-photo"><img src={favorite.dog_photo} /></div>
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
