import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

export default class Counter extends Operation {
  constructor(name) {
    super(name, [], [])

    this.input = new Parameter('signal', 'a', this.x, this.y + 40, 'bottom-left');
    this.output = new Parameter('integer', 'result', this.x + 40, this.y + 80, 'bottom-right');

    this.reaction = reaction(
      () => [
        this.input.value
      ],
      (params, reaction) => {
        this.outputs[0].value++;
      }
    );

    this.inputs.push(this.input);
    this.outputs.push(this.output);
  }
}
