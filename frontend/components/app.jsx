var React = require('react');
var SessionStore = require('../stores/session');

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      currentUser: SessionStore.currentUser()
    };
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);

    this.handleChange();
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  componentWillReceiveProps: function () {

  },

  handleChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    } else {
      this.context.router.push("/login");
    }
  },

  handleProfileClick: function () {
    // debugger;
    this.context.router.push("/profile");
  },

  handleBrowseClick: function () {
    this.context.router.push("/browse");
  },

  handleQuickMatchClick: function () {
    this.context.router.push("/quickmatch");
  },

  logOut: function () {
    ApiUtil.logout(function () {
      this.context.router.push("/login");
    }.bind(this));
  },

  render: function () {
  var button, welcomeMessage;

  if (this.state.currentUser) {
    welcomeMessage = <h2 className="welcome">Welcome, {this.state.currentUser.name}!</h2>;
    button = <button className="logout" onClick={this.logOut}>Logout</button>
  }

  return (
    <div>
      {welcomeMessage}
      <nav className="tabs group">
        <div className="root-tab-logo"></div>
        <li className="root-tab" onClick={this.handleBrowseClick} >Browse Dogs</li>
        <li className="root-tab" onClick={this.handleQuickMatchClick} >QuickMatch</li>
        <li className="root-tab" onClick={this.handleProfileClick} >Profile</li>
        {button}
    </nav>
    {this.props.children}
    </div>
  );
  }

})

module.exports = App;
