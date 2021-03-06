import Node from './Node';
import Catalog from '../operations/Catalog';
import { decorate, observable } from "mobx"
import { reaction } from "mobx";

class Operation extends Node {
  constructor(options) {
    super(options)

    this.name = options.name;
    this.rotate = options.rotate;
    this.computing = false;

    this.params = {};
    this.offsets = {};

    this.listenCoordinates();
  }

  listenCoordinates () {
    this.reaction = reaction(
      () => [
        this.x,
        this.y,
      ],
      (params, reaction) => {
        this.updateParameterPositions();
      }
    );
  }

  getParameter(name) {
    if (!this.params[name]) {
      throw new Error(`Unknown param ${name} in ${this.constructor.name}`);
    }

    return this.params[name];
  }

  getOffset(name) {
    if (!this.offsets[name]) {
      throw new Error(`Unknown offset ${name} in ${this.constructor.name}`);
    }

    return this.offsets[name];
  }

  flashComputing () {
    this.computing = true;
  }

  flashbackComputing () {
    setTimeout(
      () => this.computing = false,
      900
    );
  }

  updateParameterPositions () {
    Object.keys(this.params).forEach((paramName) => {
      const offset = this.getOffset(paramName);
      const param = this.getParameter(paramName);

      param.x = this.x + offset.x;
      param.y = this.y + offset.y;
    });
  }

  serialize () {
    return {
      ...super.serialize(),
      name: this.name,
      kind: this.constructor.name
    }
  }

  static unserialize (data) {
    return new Catalog[data.kind](data);
  }
}

decorate(Operation, {
  computing: observable,
})

export default Operation;
