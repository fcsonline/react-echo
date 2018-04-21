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

    this.params = {
      condition: new Parameter(this, 'bool', 'condition', 'top'),
      a: new Parameter(this, 'integer', 'a', 'left'),
      b: new Parameter(this, 'integer', 'b', 'right'),
      result: new Parameter(this, 'bool', 'result', 'bottom'),
    };

    this.offsets = {
      condition: { x: 30, y: 0},
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
        this.params.condition.value,
        this.params.a.value,
        this.params.b.value,
      ],
      (params, reaction) => {
        const [condition, a, b] = params;

        this.flashComputing();
        this.params.result.value = condition ? a : b;
        this.flashbackComputing();
      }
    );
  }
}
