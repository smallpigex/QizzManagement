'use strict';

import React from 'react';

export default class ToDosListHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      error: null
    };
  }

  renderError() {
    if(!this.state.error) {
      return null;
    }
    return <div style={{color:'red'}}>{this.state.error}</div>;
  }
  render() {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="What do I need to do?" ref="createInput"/>
        <button>Create</button>
        {this.renderError()}
      </form>
    );
  }
  handleCreate(event) {
    event.preventDefault();
    const createInput = this.refs.createInput;
    const task = createInput.value;
    const validateInput = this.validateInput(task);

    if(validateInput) {
      this.setState({error: validateInput});
      return;
    }

    this.setState({error: null});
    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';
  }

  validateInput(task) {
    if(!task) {
      return 'Please enter a task.';
    } else if(_.find(this.props.todos, todos => todos._id === _id)) {
      return 'Task already exists.';
    } else {
      return null;
    }
  }
}