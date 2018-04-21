import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';
import { reaction } from "mobx";

export default class Relational extends Operation {
  constructor(options) {
    super(options)

    this.params = {
      a: new Parameter(this, 'integer', 'a', 'left'),
      b: new Parameter(this, 'integer', 'b', 'right'),
      result: new Parameter(this, 'bool', 'result', 'bottom'),
    };

    this.offsets = {
      a: { x: 0, y: 30},
      b: { x: 60, y: 30},
      result: { x: 30, y: 60},
    };

    this.listenParameters();
    this.updateParameterPositions();
  }

  listenParameters () {
    this.reaction = reaction(
      () => [
        this.params.a.value,
        this.params.b.value,
      ],
      (params, reaction) => {
        const [a, b] = params;

        this.flashComputing();
        this.params.result.value = this.compute(a, b);
        this.flashbackComputing();
      }
    );
  }

  compute (a, b) {
    throw new Error('Abstract class');
  }
}
