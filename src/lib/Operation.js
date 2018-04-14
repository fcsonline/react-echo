import Node from './Node';

export default class Operation extends Node {
  constructor(name, inputs, outputs) {
    super()

    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
  }
}
