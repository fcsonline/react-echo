import React, { Component } from 'react';
import {observer} from "mobx-react";
import './ParameterView.css';

class ParameterView extends Component {
  getTextOffsets () {
    const { parameter } = this.props
    const offsets = {
      'bottom-right': { x: 10, y: 15},
      'bottom-left':  { x: -20, y: 15}
    }

    return offsets[parameter.anchor] || { x: 0, y: 0};
  }

  render() {
    const { parameter } = this.props;
    const { x, y } = this.getTextOffsets();

    return [
      <circle
        className="Parameter"
        cx={parameter.x}
        cy={parameter.y}
        r="4"
      />,
      <text
        className="ParameterText"
        x={parameter.x + x}
        y={parameter.y + y}
      >
        {parameter.value}
      </text>
    ];
  }
}

observer(ParameterView);

export default ParameterView;
