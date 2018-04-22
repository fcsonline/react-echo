import Logical from './Base';

export default class Or extends Logical {
  constructor(options) {
    super({
      name: '|',
      ...options
    })
  }

  compute (a, b) {
    return a || b;
  }
}
