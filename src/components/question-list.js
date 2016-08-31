/**
 * Created by smallpigex on 2016/8/1.
 */
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React from 'react';

export default class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectRowProp: {
        mode: "radio",
        clickToSelect: true
      },
      data: [],
      options: {
        onAddRow: this.onAddRow
      }
    };
  }
  onAddRow (row) {
    console.log(JSON.stringify(row));
    $.ajax({
      url: 'http://localhost:8888/api/add',
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(row),
      cache: false,
      success: function(message) {
        console.log(message);
        //this.setState({data: questions});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/questions', status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount () {
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

  render() {
    return (
      <BootstrapTable data={this.state.data} striped={true} hover={true} insertRow={true}
                      deleteRow={true} selectRow={this.state.selectRowProp} options={this.state.options}>
        <TableHeaderColumn dataField='_id' width="150" isKey={ true } editable={false} hiddenOnInsert={true}>Id</TableHeaderColumn>
        <TableHeaderColumn dataField='answer' width="150"   editable={ { type: 'textarea' } }>問題</TableHeaderColumn>
        <TableHeaderColumn dataField='question' width="150" editable={ { type: 'textarea' } }>答案</TableHeaderColumn>
        <TableHeaderColumn dataField='correctOption' width="150" editable={{type: 'textarea'}}>正確選項</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption1' width="150" editable={{type: 'textarea'}}>錯誤選項</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption2' width="150" editable={{type: 'textarea'}}>錯誤選項</TableHeaderColumn>
        <TableHeaderColumn dataField='badOption3' width="150" editable={{type: 'textarea'}}>錯誤選項</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}