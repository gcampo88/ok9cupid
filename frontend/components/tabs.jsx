var React = require('react');
var Profile = require('./profile');
var Browse = require('./browse');

var Tabs = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleProfileClick: function () {
    this.context.router.push("/profile");
  },

  handleBrowseClick: function () {
    this.context.router.push("/browse");
  },

  render: function () {
    return(<nav className="tabs group">
      <li onClick={this.handleProfileClick} >Profile</li>
      <li onClick={this.handleBrowseClick} >Browse Dogs</li>
    </nav>)
  }
})

module.exports = Tabs;
