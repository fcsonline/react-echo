import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

export default class Constant extends Operation {
  constructor(name) {
    super(name, [], [])

    this.output = new Parameter('integer', 'result', this.x + 40, this.y + 80, 'bottom-right');
    this.output.value = this.evaluate();
    this.outputs.push(this.output);
  }

  evaluate () {
    throw new Error('Abstract class');
  }
}
