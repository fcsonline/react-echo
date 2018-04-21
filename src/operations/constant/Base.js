import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

export default class Constant extends Operation {
  constructor(options) {
    super(options)

    this.params = {
      result: new Parameter('integer', 'result', 'bottom')
    };

    this.offsets = {
      result: { x: 30, y: 60},
    };

    this.listenParameters();
    this.updateParameterPositions();
  }

  listenParameters () {
    this.params.result.value = this.evaluate();
  }

  evaluate () {
    throw new Error('Abstract class');
  }
}
