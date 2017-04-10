var React = require('react');
var BugAdd = React.createClass({

	render: function() {
		return (
			<div>
			<form name='bugAdd'>
			Owner
			<input type='text' name='owner' />
			Title
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

module.exports = BugAdd
