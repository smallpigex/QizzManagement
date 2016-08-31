'use strict';

import React from 'react';

export default class ToDosListHeader extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          <th>問題</th>
          <th>答案</th>
          <th>正確選項</th>
          <th>錯誤選項</th>
          <th>錯誤選項</th>
          <th>錯誤選項</th>
        </tr>
      </thead>
    );
  }
}