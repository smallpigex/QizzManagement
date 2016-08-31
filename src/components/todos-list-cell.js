/**
 * Created by smallpigex on 2016/7/31.
 */
'use strict';

import React from 'react';

export default class ToDosListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }
  renderCell() {
    const value = this.props;
    const style = {
      cursor: 'pointer'
    }
    const idStyle = {
      cursor: 'pointer',
      display: 'none'
    }

    return (
        <td style={style} >
          {value}
        </td>
    );
  }

  // }

  render() {
    return (
      <tr>
        {this.renderCell()}
      </tr>

    );
  }

}