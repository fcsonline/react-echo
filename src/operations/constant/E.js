import Constant from './Base';

export default class Pi extends Constant {
  constructor(options) {
    super({
      name: 'e',
      ...options
    })
  }

  evaluate () {
    return Math.E;
  }
}
