import React, { Component } from 'react';
import {observer} from "mobx-react";
import './ParameterView.css';

class ParameterView extends Component {
  getTextOffsets () {
    const { parameter } = this.props
    const offsets = {
      'top':  { x: 10, y: -20, anchor: 'start' },
      'bottom':  { x: 10, y: 20, anchor: 'start' },
      'left':  { x: -10, y: 20, anchor: 'end' },
      'right':  { x: 10, y: -10, anchor: 'start' }
    }

    return offsets[parameter.anchor] || { x: 0, y: 0};
  }

  renderShape () {
    const { parameter } = this.props

    if (parameter.type === 'signal')  {
      return (
        <rect
          className="Parameter"
          x={parameter.x - 4}
          y={parameter.y - 4}
          width="8"
          height="8"
        />
      )
    }

    return (
      <circle
        className="Parameter"
        cx={parameter.x}
        cy={parameter.y}
        r="4"
      />
    )
  }

  render() {
    const { parameter } = this.props;
    const { x, y, anchor } = this.getTextOffsets();

    return [
      this.renderShape(),
      <text
        className="ParameterText"
        x={parameter.x + x}
        y={parameter.y + y}
        text-anchor={anchor}
      >
        {parameter.value.toString()}
      </text>
    ];
  }
}

observer(ParameterView);

export default ParameterView;
