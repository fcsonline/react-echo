import Arithmetic from './Base';

export default class Sum extends Arithmetic {
  constructor(options) {
    super({
      name: 'x',
      ...options
    })
  }

  compute (a, b) {
    return a * b;
  }
}
