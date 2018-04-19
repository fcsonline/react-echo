import React, { Component } from 'react';
import {observer} from "mobx-react";
import { decorate, observable } from "mobx"
import './App.css';

import Connection from './lib/Connection';
import Input from './lib/Input';

import Clock from './operations/Clock';
import Counter from './operations/Counter';
import Greater from './operations/relational/Greater';
import Sum from './operations/arithmetic/Sum';
import Subtract from './operations/arithmetic/Subtract';
import If from './operations/conditional/If';

import Pi from './operations/constant/Pi';
import E from './operations/constant/E';

import DashboardView from './views/DashboardView';

class App extends Component {
  componentWillMount () {
    this.const1 = new Pi({ x: 580, y: 100 });
    this.const2 = new E({ x: 380, y: 700 });
    this.sum1 = new Sum({ x: 430, y: 400 });
    this.subtract1 = new Subtract({ x: 530, y: 500 });
    this.if1 = new If({ name: 'if', x: 150, y: 880 });
    this.clock = new Clock({ name: '\u231b', x: 100, y: 100 });
    this.counter = new Counter({ name: '\u2807', x: 100, y: 250 });
    this.greater = new Greater({ name: '>', x: 150, y: 550 });

    this.sum1.inputs[0].value = 3;
    this.sum1.inputs[1].value = 5;

    this.subtract1.inputs[0].value = 50;
    this.subtract1.inputs[1].value = 50;

    this.if1.inputs[1].value = 150;

    this.input1 = new Input({ name: 'In', x: 350, y: 100 });

    this.c1 = new Connection(
      this.sum1.outputs[0],
      this.subtract1.inputs[0]
    )

    this.c2 = new Connection(
      this.input1.outputs[0],
      this.sum1.inputs[0]
    )

    this.c3 = new Connection(
      this.const1.outputs[0],
      this.subtract1.inputs[1]
    )

    this.c4 = new Connection(
      this.clock.outputs[0],
      this.counter.inputs[0]
    )

    this.c5 = new Connection(
      this.counter.outputs[0],
      this.greater.inputs[0]
    )

    this.c6 = new Connection(
      this.subtract1.outputs[0],
      this.greater.inputs[1]
    )

    this.c7 = new Connection(
      this.greater.outputs[0],
      this.if1.inputs[0]
    )

    this.c8 = new Connection(
      this.const2.outputs[0],
      this.if1.inputs[2]
    )

    this.objects = [
      this.sum1, this.subtract1, this.if1, this.const1, this.const2, this.clock, this.counter, this.greater,
      this.c1, this.c2, this.c3, this.c4, this.c5, this.c6, this.c7, this.c8,
      this.input1
    ]
  }

  onClickSerialize () {
    const serialized = this.objects.map((object) => object.serialize());

    localStorage.setItem('echo', JSON.stringify(serialized));
  }

  onClickRestore() {
    const data = localStorage.getItem('echo');

    this.objects= JSON.parse(data);
  }

  onClickOperation() {
    this.objects.push(new Sum('a'));
  }

  render() {

    return (
      <div className="App">
        <header className="Toolbar">
          <h1 className="Title">Welcome to react-echo</h1>
          <button onClick={this.onClickSerialize.bind(this)}>Save</button>
          <button onClick={this.onClickRestore.bind(this)}>Restore</button>
          <div className="Operations">
            <h2 className="Title">Arithmetic</h2>
            <button onClick={this.onClickOperation.bind(this)}>+</button>
            <h2 className="Title">Logical</h2>
            <h2 className="Title">Conditional</h2>
            <h2 className="Title">Constants</h2>
            <h2 className="Title">Relational</h2>
          </div>
        </header>
        <div className="Wrapper">
          <DashboardView objects={this.objects} />
        </div>
      </div>
    );
  }
}

observer(App);

decorate(App, {
  objects: observable
})

export default App;
