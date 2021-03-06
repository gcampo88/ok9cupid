var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var LoginForm = require('./components/login_form');
var SignupForm = require('./components/signup_form');
var Splash = require('./components/splash');

var App = require('./components/app');
var Profile = require('./components/profile');
var Browse = require('./components/browse');
var DogDetail = require('./components/dog_detail');
var QuickMatch = require('./components/quickmatch');
var Favorites = require('./components/favorites');

var DogUtil = require('./util/dog_util');


var SessionStore = require('./stores/session');



var router = (
  <Router history={hashHistory}>

    <Route path="/" component={App} onEnter={_requireLoggedIn} >
      <Route path="profile" component={Profile} />
      <Route path="browse" component={Browse} />
      <Route path="dogs/:dogId" component={DogDetail} />
      <Route path="favorites" component={Favorites} />
      <Route path="quickmatch" component={QuickMatch} />
    </Route>

    <Route path="/login" component={LoginForm} />
    <Route path="/splash" component={Splash} />
    <Route path="/signup" component={SignupForm} />


  </Router>
)

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {

    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }
    asyncCompletionCallback();
  }
}

$(document).ready(function () {
  Modal.setAppElement(document.body);
  ReactDOM.render(router, $('#content')[0]);

});
