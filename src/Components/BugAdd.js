var React = require('react');
var $ = require('jquery');
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

var BugAdd = React.createClass({
	getInitialState: function() {
		return (
			{
				owner: '',
				title: '',
			}
		)
	},

	render: function() {
		return (
			<Card
			  initiallyExpanded={true}>
			<CardHeader
			  title='Add Bug'
				subtitle='Enter an owner and title'
				showExpandableButton={true}
				actAsExpander={true}
				avatar={
					<Avatar
					  icon={
							<FontIcon className='fa fa-plus'></FontIcon>
						}
					/>
				}
			  />
			<CardText
			  expandable={true}
				style={{paddingTop: 0}}
				>
			<TextField
			  floatingLabelText='Owner'
				onChange={this.handleOwner}
				value={this.state.owner}
				/>
			<TextField
			  floatingLabelText='Title'
				onChange={this.handleTitle}
				value={this.state.title}
				/>
			<RaisedButton
			  label='Add'
				onTouchTap={this.handleSubmit}
				/>
			</CardText>
			</Card>
		)

	},

	handleOwner: function(e) {
		this.setState({
			owner: e.target.value
		})
	},

	handleTitle: function(e) {
		this.setState({
			title: e.target.value
		})
	},

	handleSubmit() {
		console.log(this.state);

    this.props.addBug({
			owner: this.state.owner,
			title: this.state.title,
			priority: 'P1',
			status: 'open'
		})
		this.state.owner = '';
		this.state.title = '';
	}
});
module.exports = BugAdd
