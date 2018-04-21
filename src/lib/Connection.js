import { reaction } from "mobx"
import { decorate, observable } from "mobx"
import uniqid from 'uniqid';

class Connection {
  constructor({ input, output }) {
    if (input.type !== output.type && output.type !== 'signal') {
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

  static unserialize (data) {
    const item = new Connection(data);

    // item.inputs = inputs;
    // item.outputs = outputs;

    return item;
  }
}

decorate(Connection, {
  input: observable,
  output: observable,
})

export default Connection;
