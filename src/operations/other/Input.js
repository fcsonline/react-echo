import { decorate, observable } from "mobx"
import Parameter from '../../lib/Parameter';
import Operation from '../../lib/Operation';

class Input extends Operation {
  constructor(options) {
    super(options)

    this.params = {
      result: new Parameter(this, 'integer', 'result', 'bottom')
    };

    this.offsets = {
      result: { x: 60, y: 80},
    };

    this.updateParameterPositions();
  }

  // Move to parent
  serialize () {
    return {
      ...super.serialize(),
      kind: 'Input'
    }
  }

  static unserialize (data) {
    return new Input(data);
  }
}

decorate(Input, {
  value: observable,
})

export default Input;
