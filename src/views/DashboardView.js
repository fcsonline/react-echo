import React, { Component } from 'react';
import {observer} from "mobx-react";
import './DashboardView.css';

import InputView from './InputView';
import ConnectionView from './ConnectionView';
import OperationView from './OperationView';

class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = { active: null };
  }

  onClickOperation (operation) {
    this.setState({
      active: operation
    });
  }

  onKeyDown (event) {
    const { active } = this.state;

    if (!active) return

    if (event.key === 'ArrowUp') {
      active.y = active.y - 5;
    } else if (event.key === 'ArrowDown') {
      active.y = active.y + 5;
    } else if (event.key === 'ArrowRight') {
      active.x = active.x + 5;
    } else if (event.key === 'ArrowLeft') {
      active.x = active.x - 5;
    }
  }

  renderOperation (operation) {
    const { active } = this.state;

    return (
      <OperationView
        key={operation.id}
        operation={operation}
        active={active === operation}
        onClick={this.onClickOperation.bind(this)}
      />
    );
  }

  renderInput(input) {
    return (
      <InputView
        key={input.id}
        input={input}
      />
    );
  }

  renderConnection (connection) {
    return (
      <ConnectionView
        key={connection.id}
        connection={connection}
      />
    );
  }

  render() {
    const {
      operations,
      inputs,
      connections
    } = this.props

    return (
      <div className="Dashboard" onKeyDown={this.onKeyDown.bind(this)}>
        <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
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
