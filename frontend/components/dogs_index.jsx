var React = require('react');
var DogStore = require('../stores/dog');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');
var DogsIndexItem = require('./dogs_index_item');


var DogsIndex = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

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

  goToDogShow: function (e) {
    e.preventDefault();
    debugger;
    this.context.router.push("/dogs/");  //GIGI NEED TO FIGURE OUT HOW TO PULL OUT DOG ID
  },

  render: function () {
    if (!this.state.dogs) {
      return (<div></div>);
    }

    var photo;

    var dogsToShow = this.state.dogs.map(function (dog) {
      for (var i = 0; i < dog.photos.length; i++) {
        if (dog.photos[i].$t.includes("-x")) {
          photo = (<img src={dog.photos[i].$t} onClick={this.goToDogShow} />);
        }
      }
      // debugger;

      return(
        <li onClick={this.goToDogShow}>
          {dog.name}
          {photo}
        </li>
      )
    });

    return(
      <ul>
        {dogsToShow}
      </ul>
    )
  }


});

module.exports = DogsIndex;
