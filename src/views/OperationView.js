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

    console.log('Drag', e)
    console.log('Drag2', this)

    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp (e) {
    document.removeEventListener('mousemove', this.handleMouseMove);
    this.coords = {};
    console.log('Drop', e)
  };

  handleMouseMove (e) {
    const { operation } = this.props

    console.log('Move', e)
    console.log('Move2', this.coords)
    console.log('Move3', operation.x, operation.y)
    const xDiff = this.coords.x - e.pageX;
    const yDiff = this.coords.y - e.pageY;

    this.coords.x = e.pageX;
    this.coords.y = e.pageY;

    operation.x = operation.x - xDiff;
    operation.y = operation.y - yDiff;
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
        width="80"
        height="80"
        rx="5"
        ry="5"
      />,
      ...parameters.map(this.renderParameter.bind(this)),
      <text className="OperationText" x={operation.x + 30} y={operation.y + 50}>
        {operation.name}
      </text>
    ];
  }
}

observer(OperationView);

export default OperationView;
