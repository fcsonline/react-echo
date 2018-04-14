import React, { Component } from 'react';
import {observer} from "mobx-react";
import './ParameterView.css';

import InputView from './InputView';
import ConnectionView from './ConnectionView';
import OperationView from './OperationView';

class DashboardView extends Component {
  renderOperation (operation) {
    return (
      <OperationView operation={operation} />
    );
  }

  renderInput(input) {
    return (
      <InputView input={input} />
    );
  }

  renderConnection (connection) {
    return (
      <ConnectionView connection={connection} />
    );
  }

  render() {
    const {
      operations,
      inputs,
      connections
    } = this.props

    return (
      <div className="Dashboard">
        <svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
          {operations.map(this.renderOperation.bind(this))}
          {inputs.map(this.renderInput.bind(this))}
          {connections.map(this.renderConnection.bind(this))}
        </svg>
      </div>
    )
  }
}

observer(DashboardView);

export default DashboardView;
