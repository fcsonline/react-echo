import { reaction } from "mobx"

class Connection {
  constructor(input, output) {
    if (input.type !== output.type) {
      throw new Error('incompatible type for connection');
    }

    this.input = input;
    this.output = output;
    this.reaction = reaction(
      () => input.value,
      (input, reaction) => {
        output.value = input;
      }
    );
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
