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
        <CreateTodo todos={this.state.questions} /* createTask={this.createTask.bind(this)}*//>
        <ToDosList
          todos={this.state.questions}
        /*{toggleTask={this.toggleTask.bind(this)} }*/
        /*  {saveTask={this.saveTask.bind(this)} }*/
        /* {deleteTask={this.deleteTask.bind(this)}}*/
        />
      </div>
    );
  }

  // toggleTask(task) {
  //   const foundTodo = _.find(this.mystate.todos, todo => todo.task === task);
  //   foundTodo.isCompleted = !foundTodo.isCompleted;
  //   this.setState({todos: this.mystate.todos});
  // }

  // createTask(task) {
  //
  //   this.mystate.todos.push({
  //     task,
  //     isCompleted: false
  //   });
  //   this.setState({todos: this.mystate.todos});
  // }
  //
  // saveTask(oldTask, newTask) {
  //   const foundTodo = _.find(this.mystate.todos, todo => todo.task === oldTask);
  //   foundTodo.task = newTask;
  //   this.setState({todos: this.mystate.todos});
  // }
  //
  // deleteTask(taskToDelete) {
  //   _.remove(this.mystate.todos, todos => todos.task === taskToDelete);
  //   this.setState({todos: this.mystate.todos});
  // }
}