import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';
import { reaction } from "mobx";

export default class Constant extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', 'bottom-right');
    this.output.value = this.evaluate();
    this.outputs.push(this.output);

    this.offsets = {
      result: { x: 40, y: 80},
    };

    this.updateParameterPositions();
  }

  evaluate () {
    throw new Error('Abstract class');
  }
}
