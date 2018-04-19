import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

export default class Counter extends Operation {
  constructor(options) {
    super(options)

    this.input = new Parameter('signal', 'a', 'top');
    this.output = new Parameter('integer', 'result', 'bottom');

    this.offsets = {
      a: { x: 30, y: 0 },
      result: { x: 30, y: 60 },
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
