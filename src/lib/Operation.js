import Node from './Node';
import { reaction } from "mobx";

export default class Operation extends Node {
  constructor(name, inputs, outputs) {
    super()

    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
    this.offsets = {};

    this.reaction = reaction(
      () => [
        this.x,
        this.y,
      ],
      (params, reaction) => {
        this.updateParameterPositions();
      }
    );
  }

  updateParameterPositions () {
    [
      ...this.inputs,
      ...this.outputs
    ].forEach((param) => {
      const offset = this.offsets[param.name] || { x: 0, y: 0};

      param.x = this.x + offset.x;
      param.y = this.y + offset.y;
    });
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
