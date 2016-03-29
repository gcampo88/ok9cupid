var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;

var Tabs = require('./components/tabs');
var Profile = require('./components/profile');

var App = React.createClass({
  render: function () {
    return(<div>
      Root pageeee
      {this.props.children}
    </div>)
  }
})

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Tabs} />
  </Route>
)

$(document).ready(function () {
  ReactDOM.render(<Router>{routes}</Router>, $('#content')[0]);

});
