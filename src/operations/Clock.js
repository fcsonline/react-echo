import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';

class Clock extends Operation {
  constructor(options) {
    super(options)

    this.output = new Parameter('integer', 'result', 'bottom');
    this.outputs.push(this.output);

    this.offsets = {
      result: { x: 30, y: 60},
    };

    setInterval(() => {
      this.outputs[0].value = this.outputs[0].value === 0 ? 1 : 0;
    }, 1000);

    this.updateParameterPositions();
  }
}

decorate(Clock, {
  value: observable,
})

export default Clock;
