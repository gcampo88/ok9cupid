var React = require('react');
var ApiUtil = require('../util/api_util');

var SignupForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[name]", this.state.name);
    formData.append("user[zipcode]", this.state.zipcode);
    formData.append("user[email]", this.state.email);
    formData.append("user[password]", this.state.password);

    ApiUtil.createUser(formData, function () {
      this.context.router.push("/");
    }.bind(this));
  },

  getInitialState: function () {
    return {
      name: "",
      zipcode: "",
      email: "",
      password: ""
    };
  },

  updateName: function (e) {
    this.setState({ name: e.currentTarget.value });
  },

  updateZip: function (e) {
    this.setState({ zipcode: e.currentTarget.value });
  },

  updateEmail: function (e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function (e) {
    this.setState({ password: e.currentTarget.value });
  },

  goToExistingUser: function (e) {
      this.context.router.push("/login")
  },

  guestLogin: function () {
    this.setState({
      email: "gigiheartsluna@gmail.com",
      password: "password"
    }, function () {
        ApiUtil.login(this.state, function () {
        this.context.router.push("/")
      }.bind(this))
    })
  },

  render: function () {


    return    ( <section>
      <header className="user-acq-header">
       <h1>Almost there!</h1>
       <h3>Your new best friend is only a few clicks away.</h3>
     </header>
     <form className="user-acq-form group" onSubmit={this.handleSubmit}>

       <label>Name</label>
       <input className="user-acq-input" type="text" onChange={this.updateName} value={this.state.name} />

       <label>Zip Code</label>
       <input className="user-acq-input" type="text" onChange={this.updateZip} value={this.state.zipcode} />

       <label>Email Address</label>
       <input className="user-acq-input" type="text" onChange={this.updateEmail} value={this.state.email} />

       <label>Password</label>
       <input className="user-acq-input" type="password" onChange={this.updatePassword} value={this.state.password} />

       <input className="user-acq-button" type="submit" value="Create account!" />

       <a className="facebook-login"
         href="/auth/facebook">
         Log in with facebook!
       </a>

     </form>

     <button
       className="toggle-existing-user-button"
       onClick={this.goToExistingUser}>
       Existing user? Sign in!
     </button>

     <button
       className="toggle-existing-user-button"
       onClick={this.guestLogin}>Demo login
     </button>



    </section>);

  }

  //


});

module.exports = SignupForm;
