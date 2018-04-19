import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';
import { reaction } from "mobx";

export default class If extends Operation {
  constructor(options) {
    super({
      name: 'if',
      rotate: true,
      ...options
    })

    this.condition = new Parameter('bool', 'condition', 'top');
    this.paramA = new Parameter('integer', 'a', 'left');
    this.paramB = new Parameter('integer', 'b', 'right');
    this.output = new Parameter('bool', 'result', 'bottom');

    this.offsets = {
      condition: { x: 30, y: 0},
      a: { x: 0, y: 30},
      b: { x: 60, y: 30},
      result: { x: 30, y: 60},
    };

    this.reaction = reaction(
      () => [
        this.condition.value,
        this.paramA.value,
        this.paramB.value,
      ],
      (params, reaction) => {
        const [condition, a, b] = params;

        this.flashComputing();
        this.outputs[0].value = condition ? a : b;
        this.flashbackComputing();
      }
    );

    this.inputs.push(this.condition);
    this.inputs.push(this.paramA);
    this.inputs.push(this.paramB);
    this.outputs.push(this.output);

    this.updateParameterPositions();
  }
}
