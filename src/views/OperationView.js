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
      <rect className="Operation" x={operation.x} y={operation.y} width="80" height="80" rx="5" ry="5" />,
      ...parameters.map(this.renderParameter.bind(this)),
      <text className="OperationText" x={operation.x + 30} y={operation.y + 50}>
        {operation.name}
      </text>
    ];
  }
}

observer(OperationView);

export default OperationView;
