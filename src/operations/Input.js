import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';

class Input extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', this.x + 60, this.y + 80, 'bottom-right');
    this.outputs.push(this.output);
  }
}

decorate(Input, {
  value: observable,
})

export default Input;
