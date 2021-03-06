import Arithmetic from './Base';

export default class Less extends Arithmetic {
  constructor(options) {
    super({
      name: '<',
      ...options
    })
  }

  compute (a, b) {
    return a < b;
  }
}
