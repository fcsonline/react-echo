import Arithmetic from './Base';

export default class Less extends Arithmetic {
  compute (a, b) {
    return a < b;
  }
}
