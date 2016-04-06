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
    // debugger
    if (this.state.zipcode && this.state.zipcode !== "") {
      this.redoSearch();
    } else {
      DogUtil.fetchManyDogs();
    }
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


    var user_params = {
      animal: "dog"
    };


    if (!this.state.zipcode || this.state.zipcode === "") {
      user_params.location = "10014"
    } else {
      user_params.location = this.state.zipcode;
    }

    if (this.state.search_age !== "Any" && this.state.search_age !== "") {
      user_params.age = this.state.search_age;
    }

    if (this.state.search_sex !== "Any" && this.state.search_sex !== "") {
      user_params.sex = this.state.search_sex;
    }

    if (this.state.search_size!== "Any" && this.state.search_size !== "") {
      user_params.size = this.state.search_size;
    }

    DogUtil.fetchManyDogs(user_params)
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

  nextPage: function (e) {
    var user_params = {
      location: this.state.zipcode.toString(),
      animal: "dog"
    };

    if (this.state.search_age !== "Any") {
      user_params.age = this.state.search_age;
    }

    if (this.state.search_sex !== "Any") {
      user_params.sex = this.state.search_sex;
    }

    if (this.state.search_size!== "Any") {
      user_params.size = this.state.search_size;
    }

    user_params.offset = DogStore.offset();

    DogUtil.fetchManyDogs(user_params)
  },

  render: function () {
    if (!this.state.dogs) {
      return (<div></div>);
    }


    var that = this;

    var dogsToShow = this.state.dogs.map(function (dog) {
      return(<DogsIndexItem dog={dog} key={dog.id}/>)
    });

    return(
      <div className="browse-items group" >
        <ul className="dogs-index group">
          {dogsToShow}
          <button
            className="next-page"
            onClick={this.nextPage}>
            Next Page
          </button>
        </ul>

        <form className="profile-search">

          <h3>My pup search:</h3>
          <label>Age</label>
          <select
            value={this.state.search_age}
            onChange={this.handleSearchAgeUpdate}
            className="search-param">
            <option value="Any">Any Age</option>
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
            <option value="Any">Any Size</option>
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
              <option value="Any">Doesn't Matter</option>
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
