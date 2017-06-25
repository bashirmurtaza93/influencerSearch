import $ from 'jquery';
import Plugin from 'Plugin';

const NAME = 'tableSection';

class TableSection extends Plugin {
  getName() {
    return NAME;
  }

  render() {
    this.$el.data('tableApi', this);
  }
  toggle(e) {
    let $el = this.$el;
    if (e.target.type !== 'checkbox' && e.target.type !== 'button' && e.target.tagName.toLowerCase() !== 'a' && !$(e.target).parent('div.checkbox-custom').length) {
      if ($el.hasClass('active')) {
        $el.removeClass('active');
      } else {
        $el.siblings('.table-section').removeClass('active');
        $el.addClass('active');
      }
    }
  }
  static api() {
    let api = 'click|toggle',
      touch = typeof document.ontouchstart !== 'undefined';

    if (touch) {
      type = 'touchstart|toggle';
    }
    return api;
  }
}

Plugin.register(NAME, TableSection);

export default TableSection;
