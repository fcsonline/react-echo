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

    this.state = { active: [] };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.onParameterClick = this.onParameterClick.bind(this);
    this.onParameterMouseMove = this.onParameterMouseMove.bind(this);
  }

  componentDidMount () {
    this.pt = this.refs.dashboard.createSVGPoint();
  }

  onParameterClick (parameter) {
    if (this.state.fromParameter) {
      const input = this.state.fromParameter;
      const output = parameter;

      if (input !== output) {
        this.props.addObject(new Connection({
          input,
          output,
        }));
      }
      this.setState({
        fromParameter: null
      });
    } else {
      this.setState({
        fromParameter: parameter
      });

      document.addEventListener('mousemove', this.onParameterMouseMove);
    }
  }

  onParameterMouseMove (e) {
    this.pt.x = e.clientX;
    this.pt.y = e.clientY;

    const to = this.pt.matrixTransform(this.refs.dashboard.getScreenCTM().inverse());

    this.setState({
      toX: to.x,
      toY: to.y
    });
  };

  handleMouseDown (e) {
    this.pt.x = e.pageX;
    this.pt.y = e.pageY;

    const from = this.pt.matrixTransform(this.refs.dashboard.getScreenCTM().inverse());

    this.setState({
      fromX: from.x,
      fromY: from.y,
      active: []
    });

    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp (e) {
    document.removeEventListener('mousemove', this.handleMouseMove);

    this.pt.x = e.clientX;
    this.pt.y = e.clientY;

    const to = this.pt.matrixTransform(this.refs.dashboard.getScreenCTM().inverse());

    const active = this.props.objects.filter((o) => o.x > this.state.fromX && o.x < to.x && o.y > this.state.fromY && o.y < to.y);

    this.setState({
      active,
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
      active: [operation]
    });
  }

  renderOperation (operation) {
    const { active, fromParameter } = this.state;

    return (
      <OperationView
        key={operation.id}
        operation={operation}
        point={this.pt}
        highlighted={!!fromParameter && fromParameter.operation !== operation}
        active={active.includes(operation)}
        onClick={this.onClickOperation.bind(this)}
        onParameterClick={this.onParameterClick.bind(this)}
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

  renderNewConnection () {
    const { fromParameter, toX, toY } = this.state;

    if (!fromParameter || !toX || !toY) return

    return (
      <path stroke='#44b5e8' strokeWidth="2" markerEnd="url(#arrow)" d={`M ${fromParameter.x} ${fromParameter.y} L ${toX} ${toY}`} />
    )
  }

  renderSelection () {
    const { toX, toY, fromX, fromY } = this.state;

    if (!fromX || !fromY || !toX || !toY) return

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
      <div className="Dashboard">
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
          {this.renderNewConnection()}
        </svg>
      </div>
    )
  }
}

observer(DashboardView);

export default DashboardView;
