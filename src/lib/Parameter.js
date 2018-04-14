import { decorate, observable } from "mobx"
import Node from './Node';

class Parameter extends Node {
  constructor(type, name, x, y) {
    super()

    this.x = x;
    this.y = y;
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
}

decorate(Parameter, {
  value: observable,
})

export default Parameter;
