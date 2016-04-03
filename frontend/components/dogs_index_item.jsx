var React = require('react');
var DogStore = require('../stores/dog');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');


var DogsIndexItem = React.createClass({

  render: function () {
    if (!this.props.dog) {
      return (<div></div>);
    }

    var photos = this.props.dog.photos.map(function (photoObject) {
      if (photoObject.$t.includes("-x")) {
        return (<li><img src={photoObject.$t} /></li>);
      }
    });

    var breeds;

    if (Array.isArray(this.props.dog.breeds)) {
      breeds = this.props.dog.breeds.map(function (breedObj) {
        return (<div>{breedObj.$t}</div>);
      });
    } else {
      breeds = this.props.dog.breeds.$t;
    }





    return(
      <section className="dog-show-content group">
        <ul className="dog-show-photos group">{photos}</ul>

        <label className="dog-show-label">Name:</label>
         <label className="dog-show-info">{this.props.dog.name}</label>

        <label className="dog-show-label">Age:</label>
         <label className="dog-show-info">{this.props.dog.age}</label>

        <label className="dog-show-label">Size:</label>
         <label className="dog-show-info">{this.props.dog.size}</label>

        <label className="dog-show-label">Sex:</label>
         <label className="dog-show-info">{this.props.dog.sex}</label>

        <label className="dog-show-label">Breed(s):</label>
         <label className="dog-show-info">{breeds}</label>

        <label className="dog-show-label">About this pup:</label>
         <label className="dog-show-info">{this.props.dog.description}</label>

        <label className="dog-show-label">City:</label>
         <label className="dog-show-info">{this.props.dog.city}</label>

        <label className="dog-show-label">Zipcode:</label>
         <label className="dog-show-info">{this.props.dog.zipcode}</label>

        <label className="dog-show-label">Shelter email:</label>
         <label className="dog-show-info">{this.props.dog.email}</label>




      </section>
    )
  }
});

module.exports = DogsIndexItem;
