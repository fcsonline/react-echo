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

  onClick (e) {
    const { parameter, onClick } = this.props

    e.stopPropagation();
    onClick(parameter);
  }

  renderShape () {
    const { parameter } = this.props

    if (parameter.type === 'signal')  {
      return (
        <rect
          onClick={this.onClick.bind(this)}
          x={parameter.x - 4}
          y={parameter.y - 4}
          width="8"
          height="8"
        />
      )
    }

    return (
      <circle
        onClick={this.onClick.bind(this)}
        className="Parameter"
        cx={parameter.x}
        cy={parameter.y}
        r="5"
      />
    )
  }

  renderHighlight () {
    const { parameter, highlighted } = this.props;

    if (!highlighted) return

    return (
      <circle
        className="ParameterHighlight"
        cx={parameter.x}
        cy={parameter.y}
        r="10"
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
        textAnchor={anchor}
      >
        {parameter.value.toString()}
      </text>,
      this.renderHighlight()
    ];
  }
}

observer(ParameterView);

export default ParameterView;
