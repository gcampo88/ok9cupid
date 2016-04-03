var React = require('react');
var DogsIndex = require('./dogs_index');

var Browse = React.createClass({

  render: function () {
    return(<div><DogsIndex /></div>)
  }

});


module.exports = Browse;
