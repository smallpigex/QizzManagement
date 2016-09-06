/**
 * Created by smallpigex on 2016/8/7.
 */
import React from 'react';
import QuestionList from './question-list';

export default class StoreInsertQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.onAddRow = this.onAddRow.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.state = {
      selectRowProp: {
        mode: "radio",
        clickToSelect: true
      },
      data: [],
      options: {
        onAddRow: this.onAddRow
      },
      status: ''
    };
    
    
  }

  onAddRow (row) {
    console.log(this.state);
    console.log(JSON.stringify(row));
    $.ajax({
      url: 'http://localhost:8888/api/add',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify(row),
      cache: false,
      success: function(message) {
        console.log(message);
        console.log(this);
        this.getQuestions();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/questions', status, err.toString());
      }.bind(this)
    });
  }
  
  getQuestions() {
    $.ajax({
      url: 'http://localhost:8888/api/questions',
      dataType: 'json',
      cache: false,
      success: function(questions) {
        console.log(questions);
        this.setState({data: questions});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/questions', status, err.toString());
      }.bind(this)
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    return true;
  }

  componentDidMount () {
    this.getQuestions();
  }

  render() {
    return (
      <QuestionList onAddRow={ this.onAddRow.bind(this) } { ...this.state } />
    );
  }
}