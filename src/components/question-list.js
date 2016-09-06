/**
 * Created by smallpigex on 2016/8/1.
 */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React from 'react';

export default class QuestionList extends React.Component {
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
      <BootstrapTable data={this.state.data} striped={true} hover={true} insertRow={true}
                      deleteRow={true} selectRow={this.state.selectRowProp} options={this.state.options}>
        <TableHeaderColumn dataField='_id' width="150" isKey={ true } editable={false} hiddenOnInsert={true}>Id</TableHeaderColumn>
        <TableHeaderColumn dataField='answer' width="150"   editable={ { type: 'textarea' } }>問題</TableHeaderColumn>
        <TableHeaderColumn dataField='question' width="150" editable={ { type: 'textarea' } }>答案</TableHeaderColumn>
        <TableHeaderColumn dataField='correctOption' width="150" editable={{type: 'textarea'}}>正確選項</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption1' width="150" editable={{type: 'textarea'}}>錯誤選項1</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption2' width="150" editable={{type: 'textarea'}}>錯誤選項2</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption3' width="150" editable={{type: 'textarea'}}>錯誤選項3</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}