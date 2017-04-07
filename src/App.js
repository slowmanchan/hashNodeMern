var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
	render: function() {
		return(
			<div>Bug Filter</div>
		)
	}
});

var BugRow = React.createClass({
	render: function() {
		return (
			<tr>
			<td>{this.props.bug._id}</td>
			<td>{this.props.bug.status}</td>
			<td>{this.props.bug.priority}</td>
			<td>{this.props.bug.owner}</td>
			<td>{this.props.bug.title}</td>
			</tr>
		)
	}
});

var BugTable = React.createClass({
	render: function() {
		// console.log("Rendering bug table, num items:", this.props.bugs.length);
		var bugRows = this.props.data.map(function(bug) {
			return <BugRow key={bug._id} bug={bug}/>
		});

		return (
			<table className='bug-table'>
			<thead>
			<tr>
			<th>id</th>
			<th>Status</th>
			<th>Priority</th>
			<th>Owner</th>
			<th>Title</th>
			</tr>
			</thead>
			<tbody>
			{bugRows}
			</tbody>
			</table>
		)
	}
});

var BugAdd = React.createClass({


	render: function() {
		return (
			<div>
			<form name='bugAdd'>
			owner
			<input type='text' name='owner' />
			title
			<input type='text' name='title'  />
			<input type='button' value='add' onClick={this.handleSubmit} />
			</form>
			</div>
		)

	},
	handleSubmit(e) {
		e.preventDefault();
		var form = document.forms.bugAdd;

		this.props.addBug({
			owner: form.owner.value,
			status: 'open',
			priority: 'safe',
			title: form.title.value,
		});

		form.owner.value = '';
		form.title.value = '';
	}
});



var BugList = React.createClass({
	getInitialState: function() {
		return {
			bugs: []
		}
	},

	componentDidMount: function() {

		$.ajax('/api/bugs').done(function(data) {
			this.setState({
				bugs: data
			});
		}.bind(this));
	},

	addBug: function(bug) {
		$.ajax({
			url: '/api/bugs',
			type: 'POST',
			data: JSON.stringify(bug),
			contentType: 'application/json',
			success: function(data) {
				var bug = data;
				var bugCopy = this.state.bugs.concat(bug);
				this.setState({bugs: bugCopy});
			}.bind(this),
			err: function(xhr, status, err) {
				console.log("Error")
			}
		});
	},

	render: function() {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return (
			<div>
			<h1>BugList</h1>
			<BugTable data={this.state.bugs} />
			<BugAdd addBug={this.addBug}/>

			</div>
		)
	}
});

ReactDOM.render(
	<BugList />,
	document.getElementById('main')
);
