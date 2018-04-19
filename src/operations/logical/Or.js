import Logical from './Base';

export default class Or extends Logical {
  compute (a, b) {
    return a || b;
  }
}
