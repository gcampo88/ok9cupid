var React = require('react');
var DogsIndex = require('./dogs_index');

var Browse = React.createClass({

  render: function () {
    return(<div>
      <a  className="tab" href="#">Browse results will go here</a>
      <DogsIndex />

    </div>)
  }

});


module.exports = Browse;
