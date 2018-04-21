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

      input_operation_id: this.input.operation.id,
      input_parameter_name: this.input.name,

      output_operation_id: this.output.operation.id,
      output_parameter_name: this.output.name,
    }
  }

  static unserialize (data, finder) {
    const input = finder(data.input_operation_id);
    const output = finder(data.output_operation_id);

    return new Connection({
      input: input.getParameter(data.input_parameter_name),
      output: output.getParameter(data.output_parameter_name)
    });
  }
}

decorate(Connection, {
  input: observable,
  output: observable,
})

export default Connection;
