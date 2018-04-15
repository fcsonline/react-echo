import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';
import { reaction } from "mobx";

export default class Arithmetic extends Operation {
  constructor(name) {
    super(name, [], [])

    this.paramA = new Parameter('integer', 'a', 'bottom-left');
    this.paramB = new Parameter('integer', 'b', 'bottom-right');
    this.output = new Parameter('integer', 'result', 'bottom-right');

    this.offsets = {
      a: { x: 0, y: 40},
      b: { x: 80, y: 40},
      result: { x: 40, y: 80},
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
