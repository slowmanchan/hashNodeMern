var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;
import AppBar from 'material-ui/AppBar';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';

var BugEdit = React.createClass({
  render: function() {
    return (
      <div>
      <AppBar
      title='Bug Tracker Supreme'
      />
      <Card>
        <CardHeader
          title={`Editing: ${this.props.params.id}`}
          subtitle='Edit this bug below'
          avatar={
            <Avatar
              icon={
                <FontIcon className='fa fa-bug'></FontIcon>
              }
              />
          }
        />
        <CardText>
          <SelectField
            value={this.state.priority}
            onChange={this.onChangePriority}
            floatingLabelText='Priority'
            >
            <MenuItem
              value='P1' primaryText='P1'/>
            <MenuItem
              value='P2' primaryText='P2'/>
            <MenuItem
              value='P3' primaryText='P3'/>
          </SelectField>
          <br/>
          <SelectField
            value={this.state.status}
            onChange={this.onChangeStatus}
            >
            <MenuItem
              value='new' primaryText='New'/>
            <MenuItem
              value='open' primaryText='Open'/>
            <MenuItem
              value='fixed' primaryText='Fixed'/>
            <MenuItem
              value='closed' primaryText='Closed'/>
          </SelectField>
          <br/>
          <TextField
            value={this.state.owner}
            onChange={this.onChangeOwner}
            floatingLabelText='Owner'
            />
          <br/>
          <TextField
            value={this.state.title}
            onChange={this.onChangeTitle}
            floatingLabelText='Title'
            />
          <br/>
          <RaisedButton
            label='Edit Bug'
            onTouchTap={this.submit}
            />
          <br/>
          <FlatButton
            label='Bug to Bugs'
            linkButton={true} href='/#/bugs'
            />
        </CardText>
      </Card>
      <Snackbar
        open={this.state.open}
        message='Bug added to your list'
        autoHideDuration={4000}
        onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  },

  componentDidMount: function() {
    this.loadData()
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.params.id != prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax('/api/bugs/' + this.props.params.id).done(function(bug) {
      this.setState(bug);
    }.bind(this));
  },

  getInitialState: function() {
    return {
      open: false
    };
  },

  onChangePriority: function(e, i, value) {
    this.setState({
      priority: value
    })
  },

  onChangeStatus: function(e, i, value) {
    this.setState({
      status: value
    })
  },

  onChangeOwner: function(e) {
    this.setState({
      owner: e.target.value
    })
  },

  onChangeTitle: function(e) {
    this.setState({
      title: e.target.value
    })
  },

  submit: function(e) {
    var bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    }

    $.ajax({
      url: '/api/bugs/' + this.props.params.id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function(bug) {
        this.setState(bug);
        this.showSnackBar();
      }.bind(this),
    });
  },

  handleRequestClose: function() {
    this.setState({
      open: false,
    });
  },

  showSnackBar: function() {
    this.setState({
      open: true,
    });
  }
});

module.exports = BugEdit;
