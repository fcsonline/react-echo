import { decorate, observable } from "mobx"
import Node from './Node';

class Parameter extends Node {
  constructor(operation, type, name, anchor) {
    super()

    this.operation = operation;
    this.anchor = anchor;
    this.type = type;
    this.name = name;
    this.value = 0;
  }

  serialize () {
    return {
      id: this.id,
      kind: 'Parameter',
      type: this.type,
      name: this.name
    }
  }

  static unserialize (data) {
    return new Parameter(data);
  }
}

decorate(Parameter, {
  value: observable,
})

export default Parameter;
