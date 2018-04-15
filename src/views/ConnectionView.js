import React, { Component } from 'react';
import './ConnectionView.css';

export default class ConnectionView extends Component {
  render() {
    const { connection } = this.props

    const i = connection.input;
    const o = connection.output;

    // const mx = Math.round(Math.abs(i.x - o.x) / 2);
    // const my = Math.round(Math.abs(i.y - o.y) / 2);
    // <path className="Connection" d={`M ${i.x} ${i.y} L ${i.x} ${my} L ${mx} ${my} L ${mx} ${o.y} L ${o.x} ${o.y}`} />

    return (
      <path className="Connection" d={`M ${i.x} ${i.y} L ${o.x} ${o.y}`} />
    )
  }
}
