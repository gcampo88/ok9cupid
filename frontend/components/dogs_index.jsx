var React = require('react');
var DogStore = require('../stores/dog');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');
var DogsIndexItem = require('./dogs_index_item');


var DogsIndex = React.createClass({

  getInitialState: function () {
    return ({
      dogs: DogStore.allFetchedDogs(),
      user: SessionStore.currentUser(),
      user_params: {
        location: SessionStore.currentUser().zipcode,
        age: SessionStore.currentUser().search_age,
        sex: SessionStore.currentUser().search_sex,
        size: SessionStore.currentUser().search_size
      }
    });
  },

  componentDidMount: function () {
    DogStore.addListener(this._onChange);
    this.setState({
      dogs: DogUtil.fetchManyDogs()
    });

  },

  _onChange: function () {
    this.setState({
      dogs: DogStore.allFetchedDogs()
      //need to change this to search with user params once i set them up right.
    });
  },

  render: function () {
    if (!this.state.dogs) {
      return (<div></div>);
    }

    var dogsToShow = this.state.dogs.map(function (dog) {
      return(<DogsIndexItem key={dog.id} dog={dog} />)
    });

    return(
      <div>
        {dogsToShow}
      </div>
    )
  }


});

module.exports = DogsIndex;
