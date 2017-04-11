var React = require('react');
var $ = require('jquery');
var BugAdd = require('./BugAdd');
var BugFilter = require('./BugFilter');
var Link = require('react-router').Link;
var Router = require('react-router');

var BugList = React.createClass({
  getInitialState: function() {
    return {
      bugs: []
    }
  },

  componentDidUpdate: function(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;

    if (oldQuery.priority === newQuery.priority &&
      oldQuery.status === newQuery.status) {
        console.log("BugList: componentDidUpdate, no change")
        return;
      } else {
        console.log("BugList: componentDidUpdate, loading data");
        this.loadData();
      }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax('/api/bugs', {data: filter}).done(function(data) {
      this.setState({
        bugs: data
      });
    }.bind(this));
  },

  changeFilter: function(newFilter) {
    this.props.history.push({search: '?' + $.param(newFilter)});
  },

  componentDidMount: function() {
    console.log("BugList: componentDidMount");
    this.loadData();
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
      <h1>Awesomesss</h1>
      <BugFilter
        submitHandler={this.changeFilter}
        initFilter={this.props.location.query}/>
      <BugTable data={this.state.bugs} />
      <BugAdd addBug={this.addBug}/>

      </div>
    )
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
      <tr>
      <td><Link to={'/bugs/' + this.props.bug._id}>{this.props.bug._id}</Link></td>
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

module.exports = BugList;
