import React, { Component } from 'react';
import {observer} from "mobx-react";
import './App.css';

import Connection from './lib/Connection';
import Input from './operations/Input';
import Sum from './operations/Sum';

import DashboardView from './views/DashboardView';

class App extends Component {
  componentWillMount () {
    this.sum1 = new Sum('+');
    this.sum2 = new Sum('+');

    this.sum1.inputs[0].value = 5;
    this.sum1.inputs[1].value = 3;

    this.sum2.inputs[0].value = 50;
    this.sum2.inputs[1].value = 50;

    this.input1 = new Input('Foo');

    this.c1 = new Connection(
      this.sum1.outputs[0],
      this.sum2.inputs[1]
    )

    this.c2 = new Connection(
      this.input1.outputs[0],
      this.sum1.inputs[1]
    )

    this.foo = 0;
    setInterval(() => {
      this.sum2.inputs[0].value = this.foo;
      this.foo++;
    }, 2000);
  }

  onSerialize () {
    const ops = [this.sum1, this.sum2, this.c1, this.c2];
    console.log(ops.map((operation) => operation.serialize()));
  }

  render() {
    const operations = [this.sum1, this.sum2]
    const connections = [this.c1, this.c2]
    const inputs = [this.input1]

    return (
      <div className="App">
        <header className="Toolbar" onClick={this.onSerialize.bind(this)}>
          <h1 className="Title">Welcome to react-echo</h1>
        </header>
        <div className="Wrapper">
          <DashboardView
            operations={operations}
            inputs={inputs}
            connections={connections}
          />
        </div>
      </div>
    );
  }
}

observer(App);

export default App;
