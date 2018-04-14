import React, { Component } from 'react';
import './ConnectionView.css';

export default class ConnectionView extends Component {
  render() {
    const { connection } = this.props

    const i = connection.input;
    const o = connection.output;

    return (
      <path className="Connection" d={`M ${i.x} ${i.y} L ${o.x} ${o.y}`} />
    )
  }
}
