var React = require('react');

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
			<div>
      Priority
      <select value={this.state.priority} onChange={this.handlePriority} name='priority-filter'>
        <option value=''>Any</option>
        <option value='safe'>Safe</option>
        <option value='danger'>Danger</option>
      </select>
      Status
      <select value={this.state.status} onChange={this.handleStatus} name='status-filter'>
        <option value=''>Any</option>
        <option value='open'>Open</option>
        <option value='closed'>Closed</option>
      </select>
      <button onClick={this.handleClick}>Submit</button>
      </div>
		)
	}
});

module.exports = BugFilter;
