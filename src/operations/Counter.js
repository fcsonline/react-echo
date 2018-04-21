import Parameter from '../lib/Parameter';
import Operation from '../lib/Operation';
import { reaction } from "mobx";

export default class Counter extends Operation {
  constructor(options) {
    super(options)


    this.params = {
      input: new Parameter('signal', 'input', 'top'),
      output: new Parameter('integer', 'output', 'bottom')
    };

    this.offsets = {
      input: { x: 30, y: 0 },
      output: { x: 30, y: 60 },
    };

    this.listenParameters();
    this.updateParameterPositions();
  }

  listenParameters () {
    this.reaction = reaction(
      () => [
        this.params.input.value
      ],
      (params, reaction) => {
        this.flashComputing();
        this.params.output.value++;
        this.flashbackComputing();
      }
    );
  }
}
