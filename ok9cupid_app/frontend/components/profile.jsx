var React = require('react');
var UserStore = require('../stores/user')
var ProfileActions = require('../actions/profile_actions')

var Profile = React.createClass({
  getInitialState: function () {
    return({ user: UserStore.CurrentUser() });
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this.onChange);
  },

  componentWillReceiveProps: function (newProps) {

  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  onChange: function () {
    this.setState({ user: UserStore.CurrentUser() })
  },



  render: function () {
    return(<div>
      {this.state.user.name}
    </div>)
  }

});

module.exports = Profile;
