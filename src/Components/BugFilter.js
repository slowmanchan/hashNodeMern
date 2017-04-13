var React = require('react');
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

injectTapEventPlugin();

var BugFilter = React.createClass({
  getInitialState: function() {
    return {
      priority: this.props.initFilter.priority,
      status: this.props.initFilter.status
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.initFilter.status === this.state.status
      && nextProps.initFilter.priority === this.state.priority) {
        console.log("BugFilter: componentWillRecieveProps, no change");
        return;
      }
      console.log("BugFilter: componentWillRecieveProps, new filter:" + nextProps.initFilter);
      this.setState({status: nextProps.initFilter.status, priority: nextProps.initFilter.priority});
    },

    handleClick: function() {
      var newFilter = {};
      if (this.state.priority) newFilter.priority = this.state.priority;
      if (this.state.status) newFilter.status = this.state.status;
      this.props.submitHandler(newFilter);
    },

    handlePriority: function(e) {
      this.setState({
        priority: e.target.value
      });
    },

    handleStatus: function(e) {
      this.setState({
        status: e.target.value
      });
    },

    render: function() {
      return(
        <Card>
        <CardHeader
        title="Filter"
        subtitle="Filter Bugs"
        actAsExpander={true}
        showExpandableButton={true}
        avatar={
          <Avatar
            icon={
              <FontIcon
                className='fa fa-filter'></FontIcon>
            }
          />
        }
        />
        <CardText expandable={true}>
        <SelectField
          floatingLabelText='Priority'
          value={1}
          onChange={this.handlePriority}>
        <MenuItem value={1} primaryText='P1'/>
        <MenuItem value={2} primaryText='P2' />
        <MenuItem value={3} primaryText='P3'/>
        </SelectField>

        <SelectField
          floatingLabelText='Status'
          value={1}
          onChange={this.handleStatus}>
        <MenuItem value={1} primaryText='Open'/>
        <MenuItem value={2} primaryText='Closed'/>
        </SelectField>
        <br/>
        <RaisedButton onTouchTap={this.handleClick} label="SUBMIT"/>
        </CardText>
        </Card>
      )
    }
  });

  module.exports = BugFilter;
