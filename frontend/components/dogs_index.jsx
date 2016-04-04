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

  // goToDogShow: function (e) {
  //   e.preventDefault();
  //   debugger;
  //   this.context.router.push("/dogs/");  //GIGI NEED TO FIGURE OUT HOW TO PULL OUT DOG ID
  // },

  // handleSearchSexUpdate: function (e) {
  //   e.preventDefault();
  //   this.setState({ sex: e.target.value });
  // },
  //
  // handleSearchSizeUpdate: function (e) {
  //   e.preventDefault();
  //   this.setState({ size: e.target.value });
  // },
  //
  // handleSearchAgeUpdate: function (e) {
  //   e.preventDefault();
  //   this.setState({ age: e.target.value });
  // },

  //instead of having all new ones here, just call Profile.handlesearchupdate
  //methods. and then have an updateSearch method here that redoes search with
  //updated search params.
  //
  // updateSearch: function (e) {
  //   e.preventDefault();
  //   // reset user
  // },

  render: function () {
    if (!this.state.dogs) {
      return (<div></div>);
    }

    var photo;

    var that = this;

    var dogsToShow = this.state.dogs.map(function (dog) {
      return(<DogsIndexItem dog={dog} key={dog.id}/>)
    });

    return(
      <div>
        <ul>
          {dogsToShow}
        </ul>
        <form className="profile-search"
          encType="multipart/form-data">

          <h3>My pup search:</h3>
          <label>Age</label>
          <select
            value={this.state.age}
            onChange={this.handleSearchAgeUpdate}
            className="search-param">
            <option>Baby</option>
            <option>Young</option>
            <option>Adult</option>
            <option>Senior</option>
          </select>

          <label>Size</label>
          <select
            value={this.state.size}
            onChange={this.handleSearchSizeUpdate}
            className="search-param">
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Very Large</option>
          </select>

          <label>Sex</label>
           <select
              value={this.state.sex}
              onChange={this.handleSearchSexUpdate}
              className="search-param">
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>

          <button
            onClick={this.handleInput}>
            Update search!
          </button>

        </form>
      </div>
    )
  }


});

module.exports = DogsIndex;
