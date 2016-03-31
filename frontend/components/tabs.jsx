var React = require('react');
var Profile = require('./profile');
var Browse = require('./browse');
var SessionStore = require('../stores/session');

var Tabs = React.createClass({
//   contextTypes: {
//     router: React.PropTypes.object.isRequired
//   },
//
//   handleProfileClick: function () {
//     this.context.router.push("/profile");
//   },
//
//   handleBrowseClick: function () {
//     this.context.router.push("/browse");
//   },
//
  render: function () {
    return(<div></div>)
  }
//     var button;
//
//     if (SessionStore.currentUser()) {
//       button = <button className="logout" onClick={ApiUtil.logout}>Logout</button>
//     }
//
//     // var img = <img src="assets/images/logo.png" alt="logo" />
//     <nav className="tabs group">
//       <li className="root-tab">[Logo]</li>
//       <li className="root-tab" onClick={this.handleBrowseClick} >Browse Dogs</li>
//       <li className="root-tab" onClick={this.handleQuickMatchClick} >QuickMatch</li>
//       <li className="root-tab" onClick={this.handleProfileClick} >Profile</li>
//       {button}
//     </nav>
//     return(<div></div>
// )
//
//   }
})

module.exports = Tabs;
