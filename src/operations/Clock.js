import { decorate, observable } from "mobx"
import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

class Clock extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', 'bottom-right');
    this.outputs.push(this.output);

    this.offsets = {
      result: { x: 40, y: 80},
    };

    this.reaction = reaction(
      () => [
        this.x,
        this.y,
      ],
      (params, reaction) => {
        const [x, y] = params;

        this.output.x = x + 40;
        this.output.y = y + 80;
      }
    );

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
