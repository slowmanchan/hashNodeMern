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

var anyValue = '*';

var BugFilter = React.createClass({
  getInitialState: function() {
    return {
      priority: this.props.initFilter.priority || anyValue,
      status: this.props.initFilter.status || anyValue
    }
  },

  componentWillReceiveProps: function(newProps) {
    var newFilter = {
      status: newProps.initFilter.status || anyValue,
      priority: newProps.initFilter.priority || anyValue
    };

    if (newFilter.status === this.state.status
      && newFilter.priority === this.state.priority) {
        console.log('BugFilter: componentWillReceiveProps, no change');
        return
      }
      console.log("BugFilter: componentWillRecieveProps, new filter:" + newFilter.priority);
      this.setState({status: newFilter.status, priority: newFilter.priority});
    },

    handleClick: function() {
      var newFilter = {};
      if (this.state.priority != anyValue) newFilter.priority = this.state.priority;
      if (this.state.status != anyValue) newFilter.status = this.state.status;
      this.props.submitHandler(newFilter);
    },

    handlePriority: function(e, i, value) {
      this.setState({
        priority: value
      });
    },

    handleStatus: function(e, i, value) {
      this.setState({
        status: value
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
          value={this.state.priority}
          onChange={this.handlePriority}
          >
        <MenuItem value={anyValue} primaryText='Any'/>
        <MenuItem value='P1' primaryText='P1'/>
        <MenuItem value='P2' primaryText='P2' />
        <MenuItem value='P3' primaryText='P3'/>
        </SelectField>

        <SelectField
          floatingLabelText='Status'
          value={this.state.status}
          onChange={this.handleStatus}
          >
        <MenuItem value={anyValue} primaryText='Any'/>
        <MenuItem value='open' primaryText='Open'/>
        <MenuItem value='closed' primaryText='Closed'/>
        </SelectField>
        <br/>
        <RaisedButton onTouchTap={this.handleClick} label="SUBMIT"/>
        </CardText>
        </Card>
      )
    }
  });

  module.exports = BugFilter;
