import React, { Component } from 'react';
import {observer} from "mobx-react";
import './App.css';

import Connection from './lib/Connection';
import Input from './operations/Input';
import Clock from './operations/Clock';
import Counter from './operations/Counter';
import Greater from './operations/relational/Greater';
import Sum from './operations/arithmetic/Sum';

import Pi from './operations/constant/Pi';

import DashboardView from './views/DashboardView';

class App extends Component {
  componentWillMount () {
    this.const1 = new Pi('π');
    this.sum1 = new Sum('+');
    this.sum2 = new Sum('+');
    this.clock = new Clock('\u231b');
    this.counter = new Counter('\u2807');
    this.greater = new Greater('>');

    this.sum1.inputs[0].value = 5;
    this.sum1.inputs[1].value = 3;

    this.sum2.inputs[0].value = 50;
    this.sum2.inputs[1].value = 50;

    this.greater.inputs[1].value = 20;

    this.input1 = new Input('Foo');

    this.c1 = new Connection(
      this.sum1.outputs[0],
      this.sum2.inputs[1]
    )

    this.c2 = new Connection(
      this.input1.outputs[0],
      this.sum1.inputs[1]
    )

    this.c3 = new Connection(
      this.const1.outputs[0],
      this.sum2.inputs[0]
    )

    this.c4 = new Connection(
      this.clock.outputs[0],
      this.counter.inputs[0]
    )

    this.c5 = new Connection(
      this.counter.outputs[0],
      this.greater.inputs[0]
    )

    // this.foo = 0;
    // setInterval(() => {
    //   this.sum2.inputs[0].value = this.foo;
    //   this.foo++;
    // }, 2000);
    this.operations = [this.sum1, this.sum2, this.const1, this.clock, this.counter, this.greater]
    this.connections = [this.c1, this.c2, this.c3, this.c4, this.c5]
    this.inputs = [this.input1]
    // this.operations = []
    // this.connections = []
    // this.inputs = []
  }

  onClickSerialize () {
    const objects = [
      ...this.operations,
      ...this.connections,
      ...this.inputs
    ];
    const serialized = objects.map((object) => object.serialize());

    localStorage.setItem('echo', JSON.stringify(serialized));
  }

  onClickRestore() {
    const data = localStorage.getItem('echo');
    const serialized = JSON.parse(data);

    this.operations = serialized.filter((object) => object.kind === 'Operation');
    this.connections = serialized.filter((object) => object.kind === 'Connection');
    this.inputs = serialized.filter((object) => object.kind === 'Input');
  }

  render() {

    return (
      <div className="App">
        <header className="Toolbar">
          <h1 className="Title">Welcome to react-echo</h1>
          <button onClick={this.onClickSerialize.bind(this)}>Save</button>
          <button onClick={this.onClickRestore.bind(this)}>Restore</button>
        </header>
        <div className="Wrapper">
          <DashboardView
            operations={this.operations}
            inputs={this.inputs}
            connections={this.connections}
          />
        </div>
      </div>
    );
  }
}

observer(App);

export default App;
