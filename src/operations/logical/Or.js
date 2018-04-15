import Arithmetic from './Base';

export default class Or extends Arithmetic {
  compute (a, b) {
    return a || b;
  }
}
