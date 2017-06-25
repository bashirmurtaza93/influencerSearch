// import $ from 'jquery';
import Plugin from 'Plugin';

const NAME = 'maxlength';

class Maxlength extends Plugin {
  getName() {
    return NAME;
  }

  static getDefaults() {
    return {
      warningClass: 'tag tag-success'
    };
  }
}

Plugin.register(NAME, Maxlength);

export default Maxlength;
