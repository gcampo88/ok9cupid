var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SessionStore = require('../stores/session');
var ProfileActions = require('../actions/profile_actions');
var ApiUtil = require('../util/api_util');

var Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return({
      user: SessionStore.currentUser(),
      age: "",
      size: "",
      sex: "",
      about_me: "",
      about_life: "",
      ideal: "",
      imageFile: null

    });
  },

  componentDidMount: function () {
    // debugger;
    this.userListener = SessionStore.addListener(this.onChange);
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  onChange: function () {
    this.setState({
      user: SessionStore.currentUser(),
      age: SessionStore.currentUser().search_age,
      size: SessionStore.currentUser().search_size,
      sex: SessionStore.currentUser().search_sex,
      about_me: SessionStore.currentUser().about_me,
      about_life: SessionStore.currentUser().about_life,
      ideal: SessionStore.currentUser().ideal_dog,
      imageFile: SessionStore.currentUser().image,
    });
  },

  handleFileChange: function (e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var result = reader.result;

      this.setState({ imageFile: file });
      this.handleInput();
    }.bind(this);

    reader.readAsDataURL(file);

  },

  handleInput: function (e) {
    var formData = new FormData();
    formData.append("user[search_sex]", this.state.sex);
    formData.append("user[search_size]", this.state.size);
    formData.append("user[search_age]", this.state.age);
    formData.append("user[about_me]", this.state.about_me);
    formData.append("user[about_life]", this.state.about_life);
    formData.append("user[ideal_dog]", this.state.ideal);
    formData.append("user[image]", this.state.imageFile);

    ApiUtil.updateUserProfile(formData, this.state.user.id);
  },


  render: function () {
    if (!this.state.user) {
      return(
        <div></div>
      );
    }

    // debugger;
    return(
      <span className="profile-items group">

        <form className="profile-form">
          <h3>My Profile:</h3>
          <img className="profile-pic"
            src={this.state.user.image} />
            <input
            className="upload-pic"
            type="file"
            onChange={this.handleFileChange} />


          <label>About Me</label>
            <textarea
            className="profile-param"
            valueLink={this.linkState('about_me')}
            onBlur={this.handleInput} />

          <label>What kind of life can I give a pup?</label>
          <textarea
          className="profile-param"
          valueLink={this.linkState('about_life')}
          onBlur={this.handleInput}   />

        <label>My ideal dog enjoys:</label>
          <input type="text"
            className="profile-param"
            valueLink={this.linkState('ideal')}
            onBlur={this.handleInput} />
        </form>

        <form className="profile-search"
          encType="multipart/form-data">

          <h3>My pup search:</h3>
          <label>Age</label>
          <input type="text"
            className="search-param"
            valueLink={this.linkState('age')}
            onBlur={this.handleInput} />

          <label>Size</label>
          <input type="text"
            className="search-param"
            valueLink={this.linkState('size')}
            onBlur={this.handleInput}  />

          <label>Sex</label>
          <input type="text"
            className="search-param"
            valueLink={this.linkState('sex')}
            onBlur={this.handleInput} />

        </form>

      </span>);
  }

});


















module.exports = Profile;
