import Logical from './Base';

export default class And extends Logical {
  constructor(options) {
    super({
      name: '&',
      ...options
    })
  }

  compute (a, b) {
    return a && b;
  }
}
