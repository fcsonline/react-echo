import React, { Component } from 'react';
import {observer} from "mobx-react";
import './ConnectionView.css';

class ConnectionView extends Component {
  render() {
    const { connection } = this.props

    const i = connection.input;
    const o = connection.output;

    const offsets = {
      'top':  { x: 0, y: -20 },
      'bottom':  { x: 0, y: 20 },
      'left':  { x: -20, y: 0 },
      'right':  { x: 20, y: 0 }
    }

    const offseti = offsets[i.anchor] || { x: 0, y: 0 };
    const offseto = offsets[o.anchor] || { x: 0, y: 0 };

    return (
      <path className="Connection" marker-end="url(#arrow)" d={`M ${i.x} ${i.y} L ${i.x + offseti.x} ${i.y + offseti.y} L ${o.x + offseto.x} ${o.y + offseto.y} L ${o.x} ${o.y}`} />
    )
  }
}

observer(ConnectionView);

export default ConnectionView;
