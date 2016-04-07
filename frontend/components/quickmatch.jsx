var React = require('react');

var DogStore = require('../stores/dog');
var FavoriteStore = require('../stores/favorite');
var SessionStore = require('../stores/session');

var FavoriteUtil = require('../util/favorite_util');
var DogUtil = require('../util/dog_util');


var QuickMatch = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },


  getInitialState: function () {
    return this.getStateFromDogStore();
  },

  getStateFromDogStore: function () {
    var currentDog = DogStore.singleFetchedDog();;
    return({ dog: currentDog })
  },

  _onChange: function () {
    this.setState(this.getStateFromDogStore())
  },

  componentDidMount: function () {
    this.dogListener = DogStore.addListener(this._onChange);
    this.favoriteListener = FavoriteStore.addListener(this._onChange);
    this.redoSearch();
  },

  componentWillUnmount: function () {
    this.dogListener.remove();
    this.favoriteListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.redoSearch();
  },

  toggleFavorite: function () {

    if (FavoriteStore.isFavorite(this.state.dog.id)) {
      var id = FavoriteStore.findFavoriteID(this.state.dog.id);
      FavoriteUtil.destroyFavorite(id, function () {
        this.context.router.push("/browse")
      }.bind(this));

    } else {

      var photo;

      if (this.state.dog.photos) {
        for (var i = 0; i < this.state.dog.photos.length; i ++ ) {
          if (this.state.dog.photos[i].$t.includes("-x")) {
            photo = this.state.dog.photos[i].$t;
          }
        }
      }


      var favoriteData = {
        favorite: {
          user_id: SessionStore.currentUser().id,
          dog_id: parseInt(this.state.dog.id),
          dog_photo: photo,
          dog_name: this.state.dog.name
        }
      }

      FavoriteUtil.createFavorite(favoriteData)

    }
  },

  redoSearch: function () {
    var user_params = {
      location: SessionStore.currentUser().zipcode || "10014",
      animal: "dog"
    };

    if (SessionStore.currentUser().search_age !== "Any" && SessionStore.currentUser().search_age !== "") {
      user_params.age = SessionStore.currentUser().search_age;
    }

    if (SessionStore.currentUser().search_sex !== "Any" && SessionStore.currentUser().search_sex !== "") {
      user_params.sex = SessionStore.currentUser().search_sex;
    }

    if (SessionStore.currentUser().search_size!== "Any" && SessionStore.currentUser().search_size !== "") {
      user_params.size = SessionStore.currentUser().search_size;
    }


    DogUtil.fetchRandomDog(user_params);
  },

  showDetail: function () {
    this.props.closeModal();
    this.context.router.push("/dogs/" + this.state.dog.id);
  },

  render: function () {
    if (!this.state.dog) {
      return (<div></div>);
    }

    if (!this.state.dog.photos) {
      this.redoSearch();
    }

    var photos;
    if (this.state.dog.photos) {
      photos = this.state.dog.photos.map(function (photoObject, index) {
        if (photoObject.$t.includes("-x")) {
          return (<li key={index}><img src={photoObject.$t} /></li>);
        }
      });
    }


    var favoriteText = FavoriteStore.isFavorite(this.state.dog.id) ? "Remove Favorite" : "Add Favorite"


    return(
      <section className="quickmatch-content group">


        <label className="quickmatch-info">{this.state.dog.name}</label>
        <ul className="quickmatch-photos group">{photos}</ul>

          <form className="quickmatch-buttons">
            <button
              className="favorite-button"
              onClick={this.toggleFavorite}
              >{favoriteText}</button>
            <button
              className="favorite-button"
              onClick={this.redoSearch}>
              Match me again
            </button>
            <button
              className="favorite-button"
              onClick={this.showDetail}>
              More info about {this.state.dog.name}
            </button>
          </form>



      </section>
    )
  }
});


module.exports = QuickMatch;
