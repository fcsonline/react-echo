import { decorate, observable } from "mobx"
import Parameter from './Parameter';
import Operation from './Operation';

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
      ...super.serialize(),
      kind: 'Input'
    }
  }
}

decorate(Input, {
  value: observable,
})

export default Input;
