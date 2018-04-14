import React, { Component } from 'react';
import {observer} from "mobx-react";
import './InputView.css';
import ParameterView from './ParameterView';

class InputView extends Component {
  onChange(event) {
    const { input: operation } = this.props
    const output = operation.outputs[0];

    output.value = +event.target.value;
  }

  renderParameter (parameter) {
    const { input: operation } = this.props

    return (
      <ParameterView
        key={`${operation.id}-${parameter.id}`}
        parameter={parameter}
      />
    )
  }

  render() {
    const { input: operation } = this.props
    const parameters = operation.outputs;

    return [
      <rect className="InputView" x={operation.x} y={operation.y} width="120" height="80" rx="5" ry="5" />,
      ...parameters.map(this.renderParameter.bind(this)),
      <text x={operation.x} y={operation.y} fontFamily="Sans-serif" fontSize="15">
        {operation.name}
      </text>,
      <foreignObject x={operation.x + 20} y={operation.y + 20} width="80" height="60">
        <div xmlns="http://www.w3.org/1999/xhtml">
        <input type="text" name="name" pattern="[0-9]*" onChange={this.onChange.bind(this)} />
        </div>
      </foreignObject>
    ];
  }
}

observer(InputView);

export default InputView;
