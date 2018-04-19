import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';

class Input extends Operation {
  constructor(options) {
    super(options)

    this.output = new Parameter('integer', 'result', 'bottom');
    this.outputs.push(this.output);

    this.offsets = {
      result: { x: 60, y: 80},
    };

    this.updateParameterPositions();
  }

  // Move to parent
  serialize () {
    return {
      id: this.id,
      kind: 'Input',
      inputs: this.inputs.map((input) => input.serialize()),
      outputs: this.outputs.map((output) => output.serialize()),
    }
  }
}

decorate(Input, {
  value: observable,
})

export default Input;
