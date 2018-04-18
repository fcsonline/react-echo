import React, { Component } from 'react';
import {observer} from "mobx-react";
import './OperationView.css';
import ParameterView from './ParameterView';

class OperationView extends Component {
  constructor(props) {
    super(props);

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown (e) {
    this.coords = {
      x: e.pageX,
      y: e.pageY
    }

    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp (e) {
    const { operation } = this.props

    operation.x = Math.round(operation.x / 10) * 10;
    operation.y = Math.round(operation.y / 10) * 10;

    document.removeEventListener('mousemove', this.handleMouseMove);

    this.coords = {};
  };

  handleMouseMove (e) {
    const { operation } = this.props

    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    operation.x = ((operation.x - xDiff) / 10) * 10;
    operation.y = ((operation.y - yDiff) / 10) * 10;
  };

  renderParameter (parameter) {
    const { operation } = this.props

    return (
      <ParameterView
        key={`${operation.id}-${parameter.id}`}
        parameter={parameter}
      />
    )
  }

  render() {
    const { operation, onClick, active } = this.props
    const parameters = [
      ...operation.inputs,
      ...operation.outputs
    ]

    return [
      <rect
        onClick={() => onClick(operation)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        className={`Operation ${active ? ' OperationActive': ''}`}
        x={operation.x}
        y={operation.y}
        width="60"
        height="60"
        rx="5"
        ry="5"
      />,
      ...parameters.map(this.renderParameter.bind(this)),
      <text className="OperationText" x={operation.x + 30} y={operation.y + 30} text-anchor="middle" alignment-baseline="central">
        {operation.name}
      </text>
    ];
  }
}

observer(OperationView);

export default OperationView;
