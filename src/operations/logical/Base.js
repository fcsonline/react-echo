import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';
import { reaction } from "mobx";

export default class Logical extends Operation {
  constructor(options) {
    super(options)

    this.paramA = new Parameter('bool', 'a', 'bottom-left');
    this.paramB = new Parameter('bool', 'b', 'bottom-right');
    this.output = new Parameter('bool', 'result', 'bottom-right');

    this.offsets = {
      a: { x: 0, y: 30},
      b: { x: 30, y: 30},
      result: { x: 30, y: 30},
    };

    this.reaction = reaction(
      () => [
        this.paramA.value,
        this.paramB.value,
      ],
      (params, reaction) => {
        const [a, b] = params;
        this.outputs[0].value = this.compute(a, b);
      }
    );

    this.inputs.push(this.paramA);
    this.inputs.push(this.paramB);
    this.outputs.push(this.output);

    this.updateParameterPositions();
  }

  compute (a, b) {
    throw new Error('Abstract class');
  }
}
