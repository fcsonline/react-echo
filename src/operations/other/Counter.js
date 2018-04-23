import { reaction } from "mobx";
import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

export default class Counter extends Operation {
  constructor(options) {
    super({
      name: '⠇',
      ...options
    })

    this.params = {
      input: new Parameter(this, 'signal', 'input', 'top', false),
      output: new Parameter(this, 'integer', 'output', 'bottom', true),
      reset: new Parameter(this, 'bool', 'reset', 'right', false)
    };

    this.offsets = {
      input: { x: 30, y: 0 },
      output: { x: 30, y: 60 },
      reset: { x: 60, y: 30 },
    };

    this.listenParameters();
    this.updateParameterPositions();
  }

  listenParameters () {
    this.reaction = reaction(
      () => [
        this.params.input.value,
        this.params.reset.value
      ],
      (params, reaction) => {
        const [, reset] = params;
        const output = this.params.output;

        this.flashComputing();
        output.value = (reset ? 0 : output.value + 1);
        this.flashbackComputing();
      }
    );
  }
}
