var React = require('react');
var ApiUtil = require('../util/api_util');

var LoginForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
      password: ""
    };
  },

  updateEmail: function (e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function (e) {
    this.setState({ password: e.currentTarget.value });
  },

  handleSubmit: function (e) {
    e.preventDefault();
    ApiUtil.login(this.state, function () {
      this.context.router.push("/browse")
    }.bind(this))
  },

  goToNewUser: function (e) {
      this.context.router.push("/splash")
  },

  guestLogin: function () {
    this.setState({
      email: "gigiheartsluna@gmail.com",
      password: "password"
    }, function () {
        ApiUtil.login(this.state, function () {
        this.context.router.push("/browse")
      }.bind(this))
    })
  },

  render: function () {
    return(
      <section>
        <header className="user-acq-header">
          <h1>Sign in!</h1>

        </header>

        <form className="user-acq-form group"
              onSubmit={this.handleSubmit}>

          <label>Email Address</label>
            <input
              className="user-acq-input"
              type="text"
              onChange={this.updateEmail}
              value={this.state.email}
              />

          <label>Password</label>
            <input
              className="user-acq-input"
              type="password"
              onChange={this.updatePassword}
              value={this.state.password}
               />

          <input
            className="user-acq-button"
            type="submit"
            value="Sign in!" />

          <a className="facebook-login"
            href="/auth/facebook">
            Log in with facebook!
          </a>

        </form>


        <button
          className="toggle-existing-user-button"
          onClick={this.goToNewUser}>New user? Sign up!
        </button>

        <button
          className="toggle-existing-user-button"
          onClick={this.guestLogin}>Demo login
        </button>


      </section>


    );
  }

});


module.exports = LoginForm;
