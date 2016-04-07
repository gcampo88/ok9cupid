var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var SessionStore = require('../stores/session');

var customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      currentUser: SessionStore.currentUser(),
      modalIsOpen: false
    };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },


  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    this.handleChange();
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  handleChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    } else {
      this.context.router.push("/login");
    }
  },

  handleProfileClick: function () {
    this.context.router.push("/profile");
  },

  handleBrowseClick: function () {
    this.context.router.push("/browse");
  },

  handleQuickMatchClick: function () {
    this.openModal();

    // this.context.router.push("/quickmatch");
  },

  handleFavoritesClick: function () {
    this.context.router.push("/favorites");
  },

  handleLogoClick: function () {
    this.context.router.push("/browse");
  },

  logOut: function (e) {
    e.preventDefault();
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
        <div className="root-tab-logo" onClick={this.handleLogoClick}></div>
        <li className="root-tab" onClick={this.handleBrowseClick} >Browse Dogs</li>
        <li className="root-tab" onClick={this.handleQuickMatchClick} >QuickMatch</li>
          <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <h2>Hello</h2>
            <button onClick={this.closeModal}>close</button>
            <div>I am a modal</div>
            <form>
              <input />
              <button>tab navigation</button>
              <button>stays</button>
              <button>inside</button>
              <button>the modal</button>
            </form>
          </Modal>
        </div>
        <li className="root-tab" onClick={this.handleProfileClick} >Profile</li>
        <li className="root-tab" onClick={this.handleFavoritesClick} >Favorites</li>
        {button}
    </nav>
    {this.props.children}
    </div>
  );
  }

})

module.exports = App;
