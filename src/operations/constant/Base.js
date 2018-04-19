import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

export default class Constant extends Operation {
  constructor(options) {
    super(options)

    this.output = new Parameter('integer', 'result', 'bottom');
    this.output.value = this.evaluate();
    this.outputs.push(this.output);

    this.offsets = {
      result: { x: 30, y: 60},
    };

    this.updateParameterPositions();
  }

  evaluate () {
    throw new Error('Abstract class');
  }
}
