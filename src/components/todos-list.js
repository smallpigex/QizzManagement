'use strict';

import React from 'react';
import ToDosListItem from './todos-list-item';
import ToDosListHeader from './todos-list-header';
import _ from 'lodash';

export default class ToDosList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'todos');
    var items = this.props.todos.map(function (todo, index) {
      return <ToDosListItem key={index} {...todo} {...props}/>;
    });
    return items;
  }

  render() {
    return (
      <table>
        <ToDosListHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    );
  }
}