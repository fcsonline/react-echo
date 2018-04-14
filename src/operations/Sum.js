import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

export default class Sum extends Operation {
  constructor(name) {
    super(name, [], [])

    this.paramA = new Parameter('integer', 'a', this.x, this.y + 40, 'bottom-left');
    this.paramB = new Parameter('integer', 'b', this.x + 80, this.y + 40, 'bottom-right');
    this.output = new Parameter('integer', 'result', this.x + 40, this.y + 80, 'bottom-right');

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
  }

  compute (a, b) {
    return a + b;
  }

  // Move to parent
  serialize () {
    return {
      id: this.id,
      kind: 'Operation',
      inputs: this.inputs.map((input) => input.serialize()),
      outputs: this.outputs.map((output) => output.serialize()),
    }
  }
}
