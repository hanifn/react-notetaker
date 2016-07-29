var React = require('react');
var Router = require('react-router');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
var Notes = require('./Notes/Notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: [],
      bio: {
        name: 'Hanif Norman'
      },
      repos: ['a', 'b', 'c']
    }
  },

  componentDidMount: function() {
    var config = {
      apiKey: "AIzaSyCfCZ0FNmrviYa_XzAoKpyfNX26QlUSpbA",
      authDomain: "react-notetaker-42afd.firebaseapp.com",
      databaseURL: "https://react-notetaker-42afd.firebaseio.com"
    };
    this.ref = Firebase.initializeApp(config).database().ref();

    var childRef = this.ref.child(this.props.params.username);

    this.bindAsArray(childRef, 'notes');
  },

  componentWillUnmount: function() {
    this.unbind('notes');
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;
