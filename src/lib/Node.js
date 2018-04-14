import uniqid from 'uniqid';
import {observer} from "mobx-react";

class Node {
  constructor() {
    this.id = uniqid();
    this.x = Math.round(Math.random() * 800);
    this.y = Math.round(Math.random() * 600);
  }
}

observer(Node);

export default Node;
