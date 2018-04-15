import Arithmetic from './Base';

export default class And extends Arithmetic {
  compute (a, b) {
    return a && b;
  }
}
