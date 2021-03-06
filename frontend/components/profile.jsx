var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/api_util');

var Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return SessionStore.currentUser();

  },

  componentDidMount: function () {
    this.userListener = SessionStore.addListener(this.onChange);
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  onChange: function () {

    this.setState({
      age: SessionStore.currentUser().search_age || "",
      size: SessionStore.currentUser().search_size || "",
      sex: SessionStore.currentUser().search_sex || "",
      about_me: SessionStore.currentUser().about_me || "",
      about_life: SessionStore.currentUser().about_life || "",
      ideal_dog: SessionStore.currentUser().ideal_dog || "",
      zipcode: SessionStore.currentUser().zipcode || "",
      imageUrl: SessionStore.currentUser().imageUrl || ""
    });
  },

  handleFileChange: function (e) {
    var file = e.currentTarget.files[0];



    var reader = new FileReader();
    reader.onloadend = function () {
      var result = reader.result;

      this.setState({ imageFile: file, imageUrl: result });
      this.handleInput();
    }.bind(this);

    reader.readAsDataURL(file);

  },

  handleEnter: function (e) {
    if (e.charCode === 13) {
      this.handleInput();
    }
  },

  handleSearchSexUpdate: function (e) {

    this.setState({ sex: e.target.value });
  },

  handleSearchSizeUpdate: function (e) {

    this.setState({ size: e.target.value });
  },

  handleSearchAgeUpdate: function (e) {

    this.setState({ age: e.target.value });
  },

  handleSearchZipUpdate: function (e) {

    this.setState({ zipcode: e.target.value });
  },

  handleInput: function (e) {

    var formData = new FormData();
    formData.append("user[search_sex]", this.state.sex);
    formData.append("user[search_size]", this.state.size);
    formData.append("user[search_age]", this.state.age);
    formData.append("user[about_me]", this.state.about_me);
    formData.append("user[about_life]", this.state.about_life);
    formData.append("user[ideal_dog]", this.state.ideal_dog);
    formData.append("user[zipcode]", this.state.zipcode);


    if (this.state.imageFile) {
      formData.append("user[image]", this.state.imageFile);
    }

    ApiUtil.updateUserProfile(formData, this.state.id);
  },


  render: function () {
    if (!SessionStore.currentUserHasBeenFetched()) {
      return(
        <div>Loading current user..</div>
      );
    }


    return(
      <section className="profile-items group">
        <hr className="breakpoint"/>

        <form className="profile-form">
          <img className="profile-pic"
            src={this.state.imageUrl} />

          <h3>{this.state.name}</h3>

            <input
            className="upload-pic"
            type="file"
            onChange={this.handleFileChange} />

          <label>About Me</label>
            <textarea
            placeholder="all about me"
            className="profile-param"
            valueLink={this.linkState('about_me')}
            onBlur={this.handleInput}
            onKeyPress={this.handleEnter}/>

          <label>What kind of life can I give a pup?</label>
            <textarea
            placeholder="all about my future pup's life"
            className="profile-param"
            valueLink={this.linkState('about_life')}
            onBlur={this.handleInput}
            onKeyPress={this.handleEnter}/>

        <label>My ideal dog is:</label>
          <textarea
            placeholder="all about my future pup"
            className="profile-param"
            valueLink={this.linkState('ideal_dog')}
            onBlur={this.handleInput}
            onKeyPress={this.handleEnter}/>
        </form>

        <form className="profile-search"
          encType="multipart/form-data">

          <h3>My pup search:</h3>
          <label>Age</label>
          <select
            value={this.state.age}
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
            value={this.state.size}
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
              value={this.state.sex}
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
            onClick={this.handleInput}>
            Save changes
          </button>

        </form>

      </section>);
  }

});




















module.exports = Profile;
