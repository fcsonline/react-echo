import uniqid from 'uniqid';

export default class Node {
  constructor() {
    this.id = uniqid();
    this.x = Math.round(Math.random() * 800);
    this.y = Math.round(Math.random() * 600);
  }
}
