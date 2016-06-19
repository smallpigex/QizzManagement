'use strict';

import React from 'react';
import CreateTodo from './create-todo';
import ToDosList from './todos-list';

const todos = [
  {
    task: 'make React tutorial',
    isCompleted: false
  },
  {
    task: 'eat dinner',
    isCompleted: true
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.mystate = {
      todos
    };
  }
  render() {
    return (
      <div>
        <h1>React ToDos App</h1>
        <CreateTodo todos={this.mystate.todos} createTask={this.createTask.bind(this)}/>
        <ToDosList 
          todos={this.mystate.todos} 
          toggleTask={this.toggleTask.bind(this)} 
          saveTask={this.saveTask.bind(this)} 
          deleteTask={this.deleteTask.bind(this)}/>
      </div>
    );
  }

  toggleTask(task) {
    const foundTodo = _.find(this.mystate.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos: this.mystate.todos});
  }

  createTask(task) {

    this.mystate.todos.push({
      task,
      isCompleted: false
    });
    this.setState({todos: this.mystate.todos});
  }

  saveTask(oldTask, newTask) {
    const foundTodo = _.find(this.mystate.todos, todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({todos: this.mystate.todos});
  }

  deleteTask(taskToDelete) {
    _.remove(this.mystate.todos, todos => todos.task === taskToDelete);
    this.setState({todos: this.mystate.todos});
  }
}