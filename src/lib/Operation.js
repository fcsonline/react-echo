import Node from './Node';
import { reaction } from "mobx";

export default class Operation extends Node {
  constructor(options) {
    super(options)

    this.name = options.name;
    this.inputs = [];
    this.outputs = [];
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

  serialize () {
    return {
      ...super.serialize(),
      kind: 'Operation',
      inputs: this.inputs.map((input) => input.serialize()),
      outputs: this.outputs.map((output) => output.serialize()),
    }
  }
}
