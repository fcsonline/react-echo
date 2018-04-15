import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

export default class Counter extends Operation {
  constructor(name) {
    super(name, [], [])

    this.input = new Parameter('signal', 'a', 'top-left');
    this.output = new Parameter('integer', 'result', 'bottom-right');

    this.offsets = {
      a: { x: 40, y: 0},
      result: { x: 40, y: 80},
    };

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

    this.updateParameterPositions();
  }
}
