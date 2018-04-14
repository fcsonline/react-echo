import React, { Component } from 'react';
import {observer} from "mobx-react";
import './OperationView.css';
import ParameterView from './ParameterView';

class OperationView extends Component {
  renderParameter (parameter) {
    return (
      <ParameterView parameter={parameter} />
    )
  }

  render() {
    const { operation } = this.props
    const parameters = [
      ...operation.inputs,
      ...operation.outputs
    ]

    return [
      <rect className="Operation" x={operation.x} y={operation.y} width="120" height="80" rx="5" ry="5" />,
      ...parameters.map(this.renderParameter.bind(this)),
      <text x={operation.x} y={operation.y} fontFamily="Sans-serif" fontSize="15">
        {operation.name}
      </text>,
      <text x={operation.x} y={operation.y + 10} fontFamily="Sans-serif" fontSize="15">
        Value: {operation.outputs[0].value}
      </text>
    ];
  }
}

observer(OperationView);

export default OperationView;
