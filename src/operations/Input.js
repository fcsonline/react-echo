import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';

class Input extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', this.x + 60, this.y + 80, 'bottom-right');
    this.outputs.push(this.output);
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
