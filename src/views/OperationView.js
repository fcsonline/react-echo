import React, { Component } from 'react';
import {observer} from "mobx-react";
import './OperationView.css';
import ParameterView from './ParameterView';

class OperationView extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown (e) {
    e.stopPropagation();

    const { point: pt } = this.props;

    pt.x = e.pageX;
    pt.y = e.pageY;

    const from = pt.matrixTransform(this.refs.operation.getScreenCTM().inverse());

    this.setState({
      fromX: from.x,
      fromY: from.y
    });

    document.addEventListener('mousemove', this.handleMouseMove);
  };

  handleMouseUp (e) {
    e.stopPropagation();

    const { operation } = this.props

    operation.x = Math.round(operation.x / 10) * 10;
    operation.y = Math.round(operation.y / 10) * 10;

    document.removeEventListener('mousemove', this.handleMouseMove);

    this.setState({
      fromX: null,
      fromY: null
    });
  };

  handleMouseMove (e) {
    e.stopPropagation();

    const { operation, point: pt } = this.props;

    pt.x = e.pageX;
    pt.y = e.pageY;

    const to = pt.matrixTransform(this.refs.operation.getScreenCTM().inverse());

    operation.x = to.x - 30;
    operation.y = to.y - 30;
  };

  renderParameter (parameter) {
    const { operation, highlighted } = this.props

    return (
      <ParameterView
        key={`${operation.id}-${parameter.id}`}
        parameter={parameter}
        onClick={this.props.onParameterClick}
        highlighted={highlighted}
      />
    )
  }

  render() {
    const { operation, onClick, active } = this.props
    const computing = operation.computing;

    return [
      <rect
        ref="operation"
        onClick={() => onClick(operation)}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseUp={this.handleMouseUp.bind(this)}
        className={`Operation ${active ? ' OperationActive': ''} ${computing ? ' OperationComputing': ''}`}
        x={operation.x}
        y={operation.y}
        width="60"
        height="60"
        rx="5"
        ry="5"
        transform={operation.rotate ? `rotate(45 ${operation.x + 30} ${operation.y + 30})` : ''}
      />,
      ...Object.values(operation.params).map(this.renderParameter.bind(this)),
      <text className="OperationText" x={operation.x + 30} y={operation.y + 30} textAnchor="middle" alignmentBaseline="central">
        {operation.name}
      </text>
    ];
  }
}

observer(OperationView);

export default OperationView;
