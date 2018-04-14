import React, { Component } from 'react';
import {observer} from "mobx-react";
import './ParameterView.css';

class ParameterView extends Component {
  render() {
    const { parameter } = this.props

    return (
      <circle
        className="Parameter"
        cx={parameter.x}
        cy={parameter.y}
        r="4"
      />
    )
  }
}

observer(ParameterView);

export default ParameterView;
