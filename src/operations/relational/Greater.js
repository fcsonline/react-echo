import Arithmetic from './Base';

export default class Greater extends Arithmetic {
  compute (a, b) {
    return a > b;
  }
}
