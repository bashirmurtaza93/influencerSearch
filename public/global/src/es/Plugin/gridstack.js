import $ from 'jquery';
import Plugin from 'Plugin';

const NAME = 'gridstack';

class Gridstack extends Plugin {
  getName() {
    return NAME;
  }

  static getDefaults() {
    return {
      cell_height: 80,
      vertical_margin: 20
    };
  }

  render() {
    if (!$.fn.gridstack) {
      return;
    }

    let $el = this.$el;

    $el.gridstack(this.options);
  }
}

Plugin.register(NAME, Gridstack);

export default Gridstack;
