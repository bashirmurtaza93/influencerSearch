import $ from 'jquery';
import bootbox from 'bootbox';

const pluginName = 'editlist';
const defaults = {};

class editlist {
  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
    this.$content = this.$element.find('.list-content');
    this.$text = this.$element.find('.list-text');
    this.$editable = this.$element.find('.list-editable');
    this.$editBtn = this.$element.find('[data-toggle=list-editable]');
    this.$delBtn = this.$element.find('[data-toggle=list-delete]');
    this.$closeBtn = this.$element.find('[data-toggle=list-editable-close]');
    this.$input = this.$element.find('input');
    this.options = $.extend({}, Plugin.defaults, options, this.$element.data());
    this.init();
  }

  init() {
    this.bind();
  }
  bind() {
    const self = this;
    this.$editBtn.on('click', () => {
      self.enable();
    });

    this.$closeBtn.on('click', () => {
      self.disable();
    });

    this.$delBtn.on('click', () => {
      if (typeof bootbox === 'undefined') return;
      bootbox.dialog({
        message: "Do you want to delete the contact?",
        buttons: {
          success: {
            label: "Delete",
            className: "btn-danger",
            callback() {
              // $(e.target).closest('.list-group-item').remove();
            }
          }
        }
      });
    });
    this.$input.on('keydown', e => {
      const keycode = (e.keyCode ? e.keyCode : e.which);

      if (keycode == 13 || keycode == 27) {
        if (keycode == 13) {
          self.$text.html(self.$input.val());
        } else {
          self.$input.val(self.$text.text());
        }

        self.disable();
      }
    });
  }

  enable() {
    this.$content.hide();
    this.$editable.show();
    this.$input.focus().select();
  }
  disable() {
    this.$content.show();
    this.$editable.hide();
  }

  static _jQueryInterface(options, ...args) {
    if (typeof options === 'string') {
      const method = options;

      if (/^\_/.test(method)) {
        return false;
      } else if ((/^(get)$/.test(method))) {
        const api = this.first().data(pluginName);
        if (api && typeof api[method] === 'function') {
          return api[method](...args);
        }
      } else {
        return this.each(function() {
          const api = $.data(this, pluginName);
          if (api && typeof api[method] === 'function') {
            api[method](...args);
          }
        });
      }
    } else {
      return this.each(function() {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new editlist(this, options));
        }
      });
    }
  }
}
$.fn[pluginName] = editlist._jQueryInterface;
$.fn[pluginName].constructor = editlist;
$.fn[pluginName].noConflict = () => {
  'use strict';
  $.fn[pluginName] = window.JQUERY_NO_CONFLICT;
  return editlist._jQueryInterface;
};

export default editlist;
