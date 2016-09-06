'use strict';

import React from 'react';
import CreateTodo from './create-todo';
import ToDosList from './todos-list';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }


  componentDidMount () {
    $.ajax({
      url: 'http://localhost:8888/api/questions',
      dataType: 'json',
      cache: false,
      success: function(questions) {
        this.setState({questions: questions});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/questions', status, err.toString());
      }.bind(this)
    });
  }
  render() {
    return (
      <div>
        <h1>React ToDos App</h1>
        <CreateTodo todos={this.state.questions} />
        <ToDosList todos={this.state.questions} />
      </div>
    );
  }
}