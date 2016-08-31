'use strict';

import React from 'react';

export default class ToDosListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  renderTaskSection(value) {
    const style = {
      cursor: 'pointer'
    }
    const idStyle = {
      cursor: 'pointer',
      display: 'none'
    }
    console.log(this.props);

    // if (this.state.isEditing) {
    //   return (
    //     <tr>
    //       <form onSubmit={this.onSaveClick.bind(this)}>
    //         <td>
    //           <input type="text" defaultValue={question} ref="editInput" />
    //         </td>
    //       </form>
    //     </tr>
    //     );
    // }
    return (
        <td style={style}>{value}</td>
      );
  }
  // renderActionSection() {
  //   if(this.state.isEditing) {
  //     return (
  //       <td>
  //         <button onClick={this.onSaveClick.bind(this)}>Save</button>
  //         <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
  //       </td>
  //     );
  //   }
  //
  //   return (
  //     <td>
  //       <button onClick={this.onEditClick.bind(this)}>Edit</button>
  //       <button onClick={this.props.deleteTask.bind(this, this.props._id)}>Delete</button>
  //     </td>
  //   );
  // }

  render() {
    return (   
      <tr>
        {this.renderTaskSection(this.props._id)}
        {this.renderTaskSection(this.props.question)}
        {this.renderTaskSection(this.props.answer)}
        {this.renderTaskSection(this.props.correctOption)}
        {this.renderTaskSection(this.props.badOption1)}
        {this.renderTaskSection(this.props.badOption2)}
        {this.renderTaskSection(this.props.badOption3)}
      </tr>

    );
  }

  // onEditClick() {
  //   this.setState({isEditing: true});
  // }
  //
  // onCancelClick() {
  //   this.setState({isEditing: false});
  // }
  //
  // onSaveClick(event) {
  //   event.preventDefault();
  //   const oldTask = this.props.question;
  //   console.log(oldTask);
  //   const newTask = this.refs.editInput.value;
  //   this.props.saveTask(oldTask, newTask);
  //   this.setState({isEditing: false});
  // }
  //
  // onDeleteClick(event) {
  //   event.preventDefault();
  //   const oldTask = this.props.question;
  //   console.log(oldTask);
  //   const newTask = this.refs.editInput.value;
  //   this.props.saveTask(oldTask, newTask);
  //   this.setState({isEditing: false});
  // }
}