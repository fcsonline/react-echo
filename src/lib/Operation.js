import Node from './Node';

export default class Operation extends Node {
  constructor(name, inputs, outputs) {
    super()

    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
  }

  // Move to parent
  serialize () {
    return {
      id: this.id,
      kind: 'Operation',
      inputs: this.inputs.map((input) => input.serialize()),
      outputs: this.outputs.map((output) => output.serialize()),
    }
  }
}
