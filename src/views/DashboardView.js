import React, { Component } from 'react';
import {observer} from "mobx-react";
import './DashboardView.css';

import Operation from '../lib/Operation';
import Connection from '../lib/Connection';

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

    document.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  onParameterClick (parameter) {
    if (this.state.fromParameter) {
      const input = this.state.fromParameter;
      const output = parameter;

      if (input.operation === parameter.operation) return;

      const valid = Connection.valid({ input, output });


      if (input !== output && valid) {
        this.props.addObject(new Connection({
          input,
          output,
        }));
      }
      this.setState({
        fromParameter: null
      });
    } else {
      if (!parameter.output) return;

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
      active: [],
      fromParameter: null
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

  onKeyDown (e) {
    const { active } = this.state;

    // TODO: Review propagation in InputView
    if (e.target.tagName === 'INPUT') return

    if (e.code === 'Backspace' || e.code === 'Delete') {
      this.props.removeObjects(active);
    }
  };

  onClickObject (object) {
    this.setState({
      active: [object]
    });
  }

  renderOperation (operation) {
    const { active, fromParameter } = this.state;
    const View = {
      Input: InputView
    }[operation.constructor.name] || OperationView;

    return (
      <View
        key={operation.id}
        operation={operation}
        point={this.pt}
        highlighted={!!fromParameter && fromParameter.operation !== operation}
        active={active.includes(operation)}
        onClick={this.onClickObject.bind(this)}
        onParameterClick={this.onParameterClick.bind(this)}
      />
    );
  }

  renderConnection (connection) {
    const { active } = this.state;

    return (
      <ConnectionView
        key={connection.id}
        connection={connection}
        onClick={this.onClickObject.bind(this)}
        active={active.includes(connection)}
      />
    );
  }

  renderNewConnection () {
    const { fromParameter, toX, toY } = this.state;

    if (!fromParameter || !toX || !toY) return

    return (
      <path
        pointerEvents='none'
        stroke='#44b5e8'
        strokeWidth="2"
        markerEnd="url(#arrow)"
        d={`M ${fromParameter.x} ${fromParameter.y} L ${toX} ${toY}`}
      />
    )
  }

  renderSelection () {
    const { toX, toY, fromX, fromY } = this.state;

    if (!fromX || !fromY || !toX || !toY) return

    return (
      <rect
        fill='#8ebfffa4'
        stroke='#44b5e8'
        x={Math.min(fromX, toX)}
        y={Math.min(fromY, toY)}
        width={Math.abs(toX - fromX)}
        height={Math.abs(toY - fromY)}
      />
    )
  }

  render() {
    const { objects } = this.props;
    const operations = objects.filter((o) => (o instanceof Operation));
    const connections = objects.filter((o) => o instanceof Connection);

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
