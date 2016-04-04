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
      search_age: SessionStore.currentUser().search_age,
      search_sex: SessionStore.currentUser().search_sex,
      search_size: SessionStore.currentUser().search_size,
      zipcode: SessionStore.currentUser().zipcode
    });
  },

  componentDidMount: function () {
    this.dogListener = DogStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
    DogUtil.fetchManyDogs({ location: "10014" });

    // GIGI NOTE THAT YOU COMMENTED OUT ALL THE DOGUTIL CALLS; COMMENT THEM BACK IN AFTER MONDAY!
    //nextPage will redo search with offset argument of lastOffset (figure out how to pull that out)
    //of query results... in onDispatch, set lastOffset var to payload.lastOffset
    //follow tommy's demo for pgsearch pagination. use kaminari? in that case do i use "page" keyword? yes. 
  },

  componentWillUnmount: function () {
    this.dogListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState({
      dogs: DogStore.allFetchedDogs(),
      user: SessionStore.currentUser(),
      search_age: SessionStore.currentUser().search_age,
      search_sex: SessionStore.currentUser().search_sex,
      search_size: SessionStore.currentUser().search_size
    });
  },

  redoSearch: function () {
    var user_params =
    {
      age: this.state.search_age,
      sex: this.state.search_sex,
      size: this.state.search_size,
      location: this.state.zipcode.toString(),
      animal: "dog"

    }

    debugger;
    // DogUtil.fetchManyDogs(user_params)
  },


  updateSearchParams: function (e) {
    e.preventDefault();
    var formData = new FormData();

    formData.append("user[search_sex]", this.state.search_sex);
    formData.append("user[search_size]", this.state.search_size);
    formData.append("user[search_age]", this.state.search_age);
    formData.append("user[zipcode]", this.state.zipcode);

    ApiUtil.updateUserProfile(formData, this.state.user.id);

    this.redoSearch();
  },

  handleSearchSexUpdate: function (e) {
    this.setState({ search_sex: e.target.value });
  },

  handleSearchSizeUpdate: function (e) {
    this.setState({ search_size: e.target.value });
  },

  handleSearchAgeUpdate: function (e) {
    this.setState({ search_age: e.target.value });
  },

  handleSearchZipUpdate: function (e) {
    this.setState({ zipcode: e.target.value });
  },

  render: function () {
    if (!this.state.dogs) {
      return (<div></div>);
    }

    var photo;

    var that = this;

    var dogsToShow = this.state.dogs.map(function (dog) {
      return(<DogsIndexItem dog={dog} key={dog.id}/>)
    });
    // debugger;

    return(
      <div className="browse-items group" >
        <ul className="dogs-index group">
          {dogsToShow}
        </ul>
        <form className="profile-search">

          <h3>My pup search:</h3>
          <label>Age</label>
          <select
            value={this.state.search_age}
            onChange={this.handleSearchAgeUpdate}
            className="search-param">
            <option value="Baby">Baby</option>
            <option value="Young">Young</option>
            <option value="Adult">Adult</option>
            <option value="Senior">Senior</option>
          </select>

          <label>Size</label>
          <select
            value={this.state.search_size}
            onChange={this.handleSearchSizeUpdate}
            className="search-param">
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Very Large</option>
          </select>

          <label>Sex</label>
           <select
              value={this.state.search_sex}
              onChange={this.handleSearchSexUpdate}
              className="search-param">
              <option value="F">Female</option>
              <option value="M">Male</option>
            </select>


            <label>Zipcode</label>
             <input
                type="text"
                placeholder="zipcode"
                value={this.state.zipcode}
                onChange={this.handleSearchZipUpdate}
                className="search-param">
              </input>

          <button
            onClick={this.updateSearchParams}>
            Update search!
          </button>

        </form>
      </div>
    )
  }


});

module.exports = DogsIndex;
