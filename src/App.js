import React, { Component } from 'react';
import {observer} from "mobx-react";
import { decorate, observable } from "mobx"
import './App.css';

import Catalog from './operations/Catalog';

import Connection from './lib/Connection';
import Input from './operations/other/Input';
import Clock from './operations/other/Clock';
import Counter from './operations/other/Counter';

import Sum from './operations/arithmetic/Sum';
import Multiply from './operations/arithmetic/Multiply';
import Subtract from './operations/arithmetic/Subtract';
import Pow from './operations/arithmetic/Pow';
import If from './operations/conditional/If';
import And from './operations/logical/And';
import Or from './operations/logical/Or';
import Greater from './operations/relational/Greater';
import Less from './operations/relational/Less';

import Pi from './operations/constant/Pi';
import E from './operations/constant/E';

import DashboardView from './views/DashboardView';

class App extends Component {
  constructor(props) {
    super(props);

    this.objects = [];
  }

  loadModel (data) {
    const operations = data.filter((item) => item.kind !== 'Connection');
    const connections = data.filter((item) => item.kind === 'Connection');

    const objects = operations.map((item) => {
      return Catalog[item.kind].unserialize(item);
    });

    const connectivity = connections.map((item) => {
      return Catalog[item.kind].unserialize(item, (id) => {
        return objects.filter((object) => {
          return object.id === id;
        })[0];
      });
    });

    this.objects = [
      ...objects,
      ...connectivity
    ];
  }

  onClickExample () {
    this.loadModel([{"id":"jg9uutni","x":430,"y":350,"name":"+","kind":"Sum"},{"id":"jg9uutnq","x":630,"y":350,"name":"x","kind":"Sum"},{"id":"jg9uutnm","x":530,"y":500,"name":"-","kind":"Subtract"},{"id":"jg9uutnu","x":150,"y":880,"name":"if","kind":"If"},{"id":"jg9uutnd","x":680,"y":100,"name":"π","kind":"Pi"},{"id":"jg9uutng","x":380,"y":700,"name":"e","kind":"Pi"},{"id":"jg9uutnz","x":100,"y":100,"name":"⌛","kind":"Clock"},{"id":"jg9uuto1","x":100,"y":250,"name":"⠇","kind":"Counter"},{"id":"jg9uuto4","x":150,"y":550,"name":">","kind":"Greater"},{"id":"jg9uutoa","kind":"Connection","input_operation_id":"jg9uutni","input_parameter_name":"result","output_operation_id":"jg9uutnm","output_parameter_name":"a"},{"id":"jg9uutob","kind":"Connection","input_operation_id":"jg9uuto8","input_parameter_name":"result","output_operation_id":"jg9uutni","output_parameter_name":"a"},{"id":"jg9uutoc","kind":"Connection","input_operation_id":"jg9uutnd","input_parameter_name":"result","output_operation_id":"jg9uutnq","output_parameter_name":"b"},{"id":"jg9uutod","kind":"Connection","input_operation_id":"jg9uutnz","input_parameter_name":"result","output_operation_id":"jg9uuto1","output_parameter_name":"input"},{"id":"jg9uutoe","kind":"Connection","input_operation_id":"jg9uuto1","input_parameter_name":"output","output_operation_id":"jg9uuto4","output_parameter_name":"a"},{"id":"jg9uutof","kind":"Connection","input_operation_id":"jg9uutnm","input_parameter_name":"result","output_operation_id":"jg9uuto4","output_parameter_name":"b"},{"id":"jg9uutog","kind":"Connection","input_operation_id":"jg9uuto4","input_parameter_name":"result","output_operation_id":"jg9uutnu","output_parameter_name":"condition"},{"id":"jg9uutoh","kind":"Connection","input_operation_id":"jg9uutng","input_parameter_name":"result","output_operation_id":"jg9uutnu","output_parameter_name":"b"},{"id":"jg9uutoi","kind":"Connection","input_operation_id":"jg9uutnq","input_parameter_name":"result","output_operation_id":"jg9uutnm","output_parameter_name":"b"},{"id":"jg9uuto8","x":350,"y":100,"name":"In","kind":"Input"}])
  }

  onClickSerialize () {
    const serialized = this.objects.map((object) => object.serialize());

    localStorage.setItem('echo', JSON.stringify(serialized));
  }

  onClickRestore() {
    const data = JSON.parse(localStorage.getItem('echo'))

    this.loadModel(data)
  }

  onClickOperation(builder) {
    return () => this.objects.push(builder());
  }

  addObject(object) {
    this.objects.push(object);
  }

  render() {

    return (
      <div className="App">
        <header className="Toolbar">
          <h1 className="Title">Welcome to react-echo</h1>
          <button onClick={this.onClickSerialize.bind(this)}>Save</button>
          <button onClick={this.onClickRestore.bind(this)}>Restore</button>
          <button onClick={this.onClickExample.bind(this)}>Example</button>
          <div className="Operations">

            <h2 className="Title">Arithmetic</h2>
            <button onClick={this.onClickOperation(() => new Sum()).bind(this)}>+</button>
            <button onClick={this.onClickOperation(() => new Subtract()).bind(this)}>-</button>
            <button onClick={this.onClickOperation(() => new Multiply()).bind(this)}>x</button>
            <button onClick={this.onClickOperation(() => new Pow()).bind(this)}>^</button>

            <h2 className="Title">Logical</h2>
            <button onClick={this.onClickOperation(() => new And()).bind(this)}>&</button>
            <button onClick={this.onClickOperation(() => new Or()).bind(this)}>|</button>

            <h2 className="Title">Conditional</h2>
            <button onClick={this.onClickOperation(() => new If()).bind(this)}>if</button>

            <h2 className="Title">Constants</h2>
            <button onClick={this.onClickOperation(() => new Pi()).bind(this)}>π</button>
            <button onClick={this.onClickOperation(() => new E()).bind(this)}>e</button>

            <h2 className="Title">Relational</h2>
            <button onClick={this.onClickOperation(() => new Greater()).bind(this)}>&gt;</button>
            <button onClick={this.onClickOperation(() => new Less()).bind(this)}>&lt;</button>

          </div>
        </header>
        <div className="Wrapper">
          <DashboardView
            objects={this.objects}
            addObject={this.addObject.bind(this)}
          />
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
