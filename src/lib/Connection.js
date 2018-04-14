import { reaction } from "mobx"
import uniqid from 'uniqid';

class Connection {
  constructor(input, output) {
    if (input.type !== output.type && output.type !== 'signal') {
      console.log('FCS1', input.type)
      console.log('FCS2', output.type)
      throw new Error('incompatible type for connection');
    }

    this.id = uniqid();
    this.input = input;
    this.output = output;
    this.reaction = reaction(
      () => input.value,
      (input, reaction) => {
        output.value = input;
      }
    );

    output.value = input.value;
  }

  serialize () {
    return {
      id: this.id,
      kind: 'Connection',
      input: this.input.serialize(),
      output: this.output.serialize()
    }
  }
}

export default Connection;
