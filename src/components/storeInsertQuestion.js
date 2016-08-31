/**
 * Created by smallpigex on 2016/8/7.
 */
import React from 'react';
import QuestionList from './question-list';

export default class StoreInsertQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.questions = [];
    this.state = {
      data: this.questions
    };
  }
  
  onAddRow(row) {
    this.questions.push(row);
    this.setState({
      data: this.questions
    });
  }

  render() {
    return (
      <QuestionList onAddRow={ this.onAddRow.bind(this) } { ...this.state } />
    );
  }
}