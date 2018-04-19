import Node from './Node';
import { decorate, observable } from "mobx"
import { reaction } from "mobx";

class Operation extends Node {
  constructor(options) {
    super(options)

    this.name = options.name;
    this.rotate = options.rotate;
    this.computing = false;
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

  flashComputing () {
    this.computing = true;
  }

  flashbackComputing () {
    setTimeout(
      () => this.computing = false,
      900
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

decorate(Operation, {
  computing: observable,
})

export default Operation;
