var React = require('react');
var DogStore = require('../stores/dog');
var SessionStore = require('../stores/session');
var DogUtil = require('../util/dog_util');
var DogDetail = require('./dog_detail');

var DogsIndexItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  showDetail: function () {
    this.context.router.push("/dogs/" + this.props.dog.id);
  },

  render: function () {
    if (!this.props.dog) {
      return (<div></div>);
    }

    var photo;

    for (var i = 0; i < this.props.dog.photos.length; i++) {
      if (this.props.dog.photos[i].$t.includes("-x")) {
        photo = (<img src={this.props.dog.photos[i].$t} />);
      }
    }

    return(
      <li onClick={this.showDetail} key={this.props.dog.id}>
        {this.props.dog.name}
        {photo}
      </li>);

    }
  }
);

module.exports = DogsIndexItem;
