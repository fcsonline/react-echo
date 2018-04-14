import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';

class Clock extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', this.x + 40, this.y + 80, 'bottom-right');
    this.outputs.push(this.output);

    setInterval(() => {
      this.outputs[0].value = this.outputs[0].value === 0 ? 1 : 0;
    }, 1000);
  }
}

decorate(Clock, {
  value: observable,
})

export default Clock;
