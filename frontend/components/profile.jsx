var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UserStore = require('../stores/user');
var ProfileActions = require('../actions/profile_actions');
var ApiUtil = require('../util/api_util');

var Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return({
      user: UserStore.currentUser(),
      age: "",
      size: "",
      sex: "",
      about_me: "",
      about_life: "",
      ideal: ""

    });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onChange);
    ApiUtil.fetchCurrentUser(currentUserId);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  onChange: function () {
    this.setState({
      user: UserStore.currentUser(),
      age: UserStore.currentUser().search_age,
      size: UserStore.currentUser().search_size,
      sex: UserStore.currentUser().search_sex,
      about_me: UserStore.currentUser().search_sex,
      about_life: UserStore.currentUser().search_sex,
      ideal: UserStore.currentUser().search_sex
    });
  },

  handleInput: function (e) {
    var formData = new FormData();
    formData.append("user[search_sex]", this.state.sex);
    formData.append("user[search_size]", this.state.size);
    formData.append("user[search_age]", this.state.age);
    // debugger;
    ApiUtil.updateUserProfile(formData, this.state.user.id);
  },


  render: function () {
    console.log(this.state)
    if (!this.state.user) {
      return(
        <div></div>
      );
    }

    var name = this.state.user.name;
    return(
      <span className="profile-items group">

        <form className="profile-form">
          <h3>My Profile:</h3>
          <label>About Me</label>
          <input type="text"
            className="profile-param"
            valueLink={this.linkState('about_me')}
            onBlur={this.handleInput} />

          <label>What kind of life can I give a pup?</label>
          <input type="text"
            className="profile-param"
            valueLink={this.linkState('about_life')}
            onBlur={this.handleInput}  />

          <label>About my ideal dog:</label>
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
