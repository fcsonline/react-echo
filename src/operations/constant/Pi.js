import Constant from './Base';

export default class Pi extends Constant {
  constructor(options) {
    super({
      name: 'π',
      ...options
    })
  }

  evaluate () {
    return Math.PI;
  }
}
