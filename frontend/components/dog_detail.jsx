var React = require('react');
var DogStore = require('../stores/dog');
var DogUtil = require('../util/dog_util');

var DogDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return this.getStateFromDogStore();
  },

  getStateFromDogStore: function () {
    var currentDog = DogStore.singleFetchedDog();
    return({ dog: currentDog })
  },

  _onChange: function () {
    this.setState(this.getStateFromDogStore())
  },

  componentDidMount: function () {
    this.dogListener = DogStore.addListener(this._onChange);
    DogUtil.fetchSingleDog(parseInt(this.props.params.dogId));
  },

  componentWillUnmount: function () {
    this.dogListener.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this._onChange();
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

    var favoriteText = "Add Favorite";


    return(

      <section className="dog-show-content group">
        <button className="favorite-button">{favoriteText}</button>

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


      </section>
    )
  }
});

module.exports = DogDetail;
