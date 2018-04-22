import { decorate, observable } from "mobx"
import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

class Clock extends Operation {
  constructor(options) {
    super(options)

    this.params = {
      result: new Parameter(this, 'integer', 'result', 'bottom')
    };

    this.offsets = {
      result: { x: 30, y: 60},
    };

    this.listenParameters();
    this.updateParameterPositions();
  }

  listenParameters () {
    setInterval(() => {
      this.flashComputing();
      this.params.result.value = this.params.result.value === 0 ? 1 : 0;
      this.flashbackComputing();
    }, 1000);
  }
}

decorate(Clock, {
  value: observable,
})

export default Clock;
