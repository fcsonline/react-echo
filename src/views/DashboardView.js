import React, { Component } from 'react';
import {observer} from "mobx-react";
import './DashboardView.css';

import Operation from '../lib/Operation';
import Connection from '../lib/Connection';
import Input from '../operations/other/Input';

import InputView from './InputView';
import ConnectionView from './ConnectionView';
import OperationView from './OperationView';

class DashboardView extends Component {
  constructor(props) {
    super(props);

    this.state = { active: null };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount () {
    this.pt = this.refs.dashboard.createSVGPoint();
  }

  handleMouseDown (e) {
    this.pt.x = e.pageX;
    this.pt.y = e.pageY;

    const from = this.pt.matrixTransform(this.refs.dashboard.getScreenCTM().inverse());

    this.setState({
      fromX: from.x,
      fromY: from.y
    });

    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp (e) {
    document.removeEventListener('mousemove', this.handleMouseMove);

    this.setState({
      fromX: null,
      fromY: null,
      toX: null,
      toY: null
    });
  };

  handleMouseMove (e) {
    this.pt.x = e.clientX;
    this.pt.y = e.clientY;

    const to = this.pt.matrixTransform(this.refs.dashboard.getScreenCTM().inverse());

    this.setState({
      toX: to.x,
      toY: to.y
    });
  };


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
        point={this.pt}
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
        point={this.pt}
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

  renderSelection () {
    const { toX, toY, fromX, fromY } = this.state;

    if (!toX || !toY) return

    return (
      <rect
        fill='#8ebfffa4'
        stroke='#44b5e8'
        x={fromX}
        y={fromY}
        width={Math.abs(toX - fromX)}
        height={Math.abs(toY - fromY)}
      />
    )
  }

  render() {
    const { objects } = this.props;
    const operations = objects.filter((o) => (o instanceof Operation && !(o instanceof Input))); // TODO improve
    const connections = objects.filter((o) => o instanceof Connection);
    const inputs = objects.filter((o) => o instanceof Input);

    return (
      <div className="Dashboard" onKeyDown={this.onKeyDown.bind(this)}>
        <svg
          ref="dashboard"
          viewBox="0 0 2000 1000"
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={this.handleMouseDown.bind(this)}
          onMouseUp={this.handleMouseUp.bind(this)}
        >
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="10" refY="3" orient="auto" markerUnits="strokeWidth" viewBox="0 0 20 20">
              <path d="M0,0 L0,6 L9,3 z" fill="#44b5e8" />
            </marker>
          </defs>

          {operations.map(this.renderOperation.bind(this))}
          {inputs.map(this.renderInput.bind(this))}
          {connections.map(this.renderConnection.bind(this))}
          {this.renderSelection()}
        </svg>
      </div>
    )
  }
}

observer(DashboardView);

export default DashboardView;
