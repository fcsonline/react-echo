import React, { Component } from 'react';
import {observer} from "mobx-react";
import './OperationView.css';
import ParameterView from './ParameterView';

class OperationView extends Component {
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
