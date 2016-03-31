var React = require('react');

var Splash = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSubmit: function (e) {
    e.preventDefault();
    this.context.router.push('/signup');
  },

  goToExistingUser: function () {
    this.context.router.push('/login');
  },

  render: function () {

    return(
      <section>
        <header className="user-acq-header">
          <h1>Find your new best friend in minutes.</h1>
        </header>

        <form className="user-acq-form group" onSubmit={this.handleSubmit}>

          <h4>I am a </h4>
          <select>
            <option>Puppy</option>
            <option>Dog</option>
            <option>Canine</option>
            <option>Hound</option>
          </select>
          <select>
            <option>Cuddler</option>
            <option>Lover</option>
            <option>Enthusiast</option>
            <option>Admirer</option>
            <option>Nut</option>
          </select>

          <input className="user-acq-button" type="submit" value="Continue" />

        </form>


        <button
          className="toggle-existing-user-button"
          onClick={this.goToExistingUser}>
          Existing user? Sign in!
        </button>

  </section>
  )

  }


});

module.exports = Splash;
