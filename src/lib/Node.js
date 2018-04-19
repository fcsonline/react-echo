import uniqid from 'uniqid';
import { decorate, observable } from "mobx"

class Node {
  constructor({ id=null, x=null, y=null } = {}) {
    this.id = id || uniqid();
    this.x = x || Math.round(Math.random() * 80) * 10;
    this.y = y || Math.round(Math.random() * 60) * 10;
  }

  serialize () {
    return {
      id: this.id,
      x: this.x,
      y: this.y
    }
  }
}

decorate(Node, {
  x: observable,
  y: observable,
})

export default Node;
