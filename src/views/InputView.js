import React from 'react';
import {observer} from "mobx-react";
import './InputView.css';
import OperationView from './OperationView';

class InputView extends OperationView {
  onChange(event) {
    const { operation } = this.props
    const output = operation.getParameter('result');

    output.value = +event.target.value;
  }

  renderContent () {
    const { operation } = this.props

    return (
      <foreignObject x={operation.x + 10} y={operation.y + 10} width="40" height="40">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <input
            type="text"
            name="name"
            placeholder={operation.name}
            pattern="[0-9]*"
            onChange={this.onChange.bind(this)}
            style={ { textAlign: 'center' }}
          />
        </div>
      </foreignObject>
    );
  }
}

observer(InputView);

export default InputView;
