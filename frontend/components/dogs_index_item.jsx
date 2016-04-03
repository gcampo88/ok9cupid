var React = require('react');
var DogStore = require('../stores/dog');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');


var DogsIndexItem = React.createClass({

  render: function () {
    if (!this.props.dog) {
      return (<div></div>);
    }
    // debugger

    var photos = this.props.dog.photos.map(function (photoObject) {
      return <img src={photoObject.$t} />
    });

    // debugger
    return(
      <div>
        Name: {this.props.dog.name}
        Age: {this.props.dog.age}
        Size: {this.props.dog.size}
        Sex: {this.props.dog.sex}
        Breed(s): {this.props.dog.breed}
        About this pup: {this.props.dog.description}
        City: {this.props.dog.city}
        Zipcode: {this.props.dog.zipcode}
        Shelter email: {this.props.dog.email}
        Photos: {photos}

      </div>
    )
  }
});

module.exports = DogsIndexItem;
