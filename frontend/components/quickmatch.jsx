var React = require('react');
var DogStore = require('../stores/dog');
var FavoriteStore = require('../stores/favorite');
var FavoriteUtil = require('../util/favorite_util');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');

var QuickMatch = React.createClass({

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
      location: SessionStore.currentUser().zipcode.toString(),
      animal: "dog"
    };

    if (SessionStore.currentUser().search_age !== "Any" && SessionStore.currentUser().search_age !== "null") {
      user_params.age = SessionStore.currentUser().search_age;
    }

    if (SessionStore.currentUser().search_sex !== "Any" && SessionStore.currentUser().search_sex !== "null") {
      user_params.sex = SessionStore.currentUser().search_sex;
    }

    if (SessionStore.currentUser().search_size!== "Any" && SessionStore.currentUser().search_size !== "null") {
      user_params.size = SessionStore.currentUser().search_size;
    }

    DogUtil.fetchRandomDog(user_params);
  },

  render: function () {
    if (!this.state.dog) {
      return (<div></div>);
    }


    var photos;
    if (this.state.dog.photos) {
      photos = this.state.dog.photos.map(function (photoObject, index) {
        if (photoObject.$t.includes("-x")) {
          return (<li key={index}><img src={photoObject.$t} /></li>);
        }
      });
    }

    var breeds;

    if (Array.isArray(this.state.dog.breeds)) {
      breeds = this.state.dog.breeds.map(function (breedObj, index) {
        return (<div key={index}>{breedObj.$t}</div>);
      });
    } else {
      breeds = this.state.dog.breeds.$t;
    }

    var favoriteText = FavoriteStore.isFavorite(this.state.dog.id) ? "Remove Favorite" : "Add Favorite"

    return(
      <section className="dog-show-content group">
        <button
          className="favorite-button"
          onClick={this.toggleFavorite}
          >{favoriteText}</button>

        <label className="dog-show-label">Name:</label>
         <label className="dog-show-info">{this.state.dog.name}</label>

        <ul className="dog-show-photos group">{photos}</ul>

        <label className="dog-show-label">Age:</label>
         <label className="dog-show-info">{this.state.dog.age}</label>

        <label className="dog-show-label">Size:</label>
         <label className="dog-show-info">{this.state.dog.size}</label>

        <label className="dog-show-label">Sex:</label>
         <label className="dog-show-info">{this.state.dog.sex}</label>

        <label className="dog-show-label">Breed(s):</label>
         <label className="dog-show-info">{breeds}</label>

        <label className="dog-show-label">About this pup:</label>
         <label className="dog-show-info">{this.state.dog.description}</label>

        <label className="dog-show-label">City:</label>
         <label className="dog-show-info">{this.state.dog.city}</label>

        <label className="dog-show-label">Zipcode:</label>
         <label className="dog-show-info">{this.state.dog.zipcode}</label>

        <label className="dog-show-label">Shelter email:</label>
         <label className="dog-show-info">{this.state.dog.email}</label>

       <button
         className="next-page"
         onClick={this.redoSearch}>
         Match me again!
       </button>


      </section>
    )
  }
});



module.exports = QuickMatch;
