import uniqid from 'uniqid';
import {observer} from "mobx-react";
import { decorate, observable } from "mobx"

class Node {
  constructor() {
    this.id = uniqid();
    this.x = Math.round(Math.random() * 80) * 10;
    this.y = Math.round(Math.random() * 60) * 10;
  }
}

decorate(Node, {
  x: observable,
  y: observable,
})

export default Node;
