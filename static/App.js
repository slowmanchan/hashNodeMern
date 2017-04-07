var React = require('react');
var ReactDOM = require('react-dom');

var BugFilter = React.createClass({
	displayName: 'BugFilter',

	render: function () {
		return React.createElement(
			'div',
			null,
			'Bug Filter'
		);
	}
});

var BugRow = React.createClass({
	displayName: 'BugRow',

	render: function () {
		return React.createElement(
			'tr',
			null,
			React.createElement(
				'td',
				null,
				this.props.bug._id
			),
			React.createElement(
				'td',
				null,
				this.props.bug.status
			),
			React.createElement(
				'td',
				null,
				this.props.bug.priority
			),
			React.createElement(
				'td',
				null,
				this.props.bug.owner
			),
			React.createElement(
				'td',
				null,
				this.props.bug.title
			)
		);
	}
});

var BugTable = React.createClass({
	displayName: 'BugTable',

	render: function () {
		// console.log("Rendering bug table, num items:", this.props.bugs.length);
		var bugRows = this.props.data.map(function (bug) {
			return React.createElement(BugRow, { key: bug._id, bug: bug });
		});

		return React.createElement(
			'table',
			{ className: 'bug-table' },
			React.createElement(
				'thead',
				null,
				React.createElement(
					'tr',
					null,
					React.createElement(
						'th',
						null,
						'id'
					),
					React.createElement(
						'th',
						null,
						'Status'
					),
					React.createElement(
						'th',
						null,
						'Priority'
					),
					React.createElement(
						'th',
						null,
						'Owner'
					),
					React.createElement(
						'th',
						null,
						'Title'
					)
				)
			),
			React.createElement(
				'tbody',
				null,
				bugRows
			)
		);
	}
});

var BugAdd = React.createClass({
	displayName: 'BugAdd',


	render: function () {
		return React.createElement(
			'div',
			null,
			React.createElement(
				'form',
				{ name: 'bugAdd' },
				'owner',
				React.createElement('input', { type: 'text', name: 'owner' }),
				'title',
				React.createElement('input', { type: 'text', name: 'title' }),
				React.createElement('input', { type: 'button', value: 'add', onClick: this.handleSubmit })
			)
		);
	},
	handleSubmit(e) {
		e.preventDefault();
		var form = document.forms.bugAdd;

		this.props.addBug({
			owner: form.owner.value,
			status: 'open',
			priority: 'safe',
			title: form.title.value
		});

		form.owner.value = '';
		form.title.value = '';
	}
});

var BugList = React.createClass({
	displayName: 'BugList',

	getInitialState: function () {
		return {
			bugs: []
		};
	},

	componentDidMount: function () {

		$.ajax('/api/bugs').done(function (data) {
			this.setState({
				bugs: data
			});
		}.bind(this));
	},

	addBug: function (bug) {
		$.ajax({
			url: '/api/bugs',
			type: 'POST',
			data: JSON.stringify(bug),
			contentType: 'application/json',
			success: function (data) {
				var bug = data;
				var bugCopy = this.state.bugs.concat(bug);
				this.setState({ bugs: bugCopy });
			}.bind(this),
			err: function (xhr, status, err) {
				console.log("Error");
			}
		});
	},

	render: function () {
		console.log("Rendering bug list, num items:", this.state.bugs.length);
		return React.createElement(
			'div',
			null,
			React.createElement(
				'h1',
				null,
				'BugList'
			),
			React.createElement(BugTable, { data: this.state.bugs }),
			React.createElement(BugAdd, { addBug: this.addBug })
		);
	}
});

ReactDOM.render(React.createElement(BugList, null), document.getElementById('main'));