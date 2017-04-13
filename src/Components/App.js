var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList');
var Router = require('react-router').Router;
var Redirect = require('react-router').Redirect;
var Route = require('react-router').Route;
var BugEdit = require('./BugEdit');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


var NotFound = React.createClass({
	render: function() {
		return (
			<div>
			  <h1>404 Page not found</h1>
			</div>
		)
	}
})

ReactDOM.render(
  (
		<MuiThemeProvider>
		<Router>
		  <Route path='/bugs' component={BugList} />
			<Route path='/bugs/:id' component={BugEdit} />
			<Redirect from='/' to='/bugs'/>
			<Route path='*' component={NotFound}/>
		</Router>
		</MuiThemeProvider>
	),
	document.getElementById('main')
);
