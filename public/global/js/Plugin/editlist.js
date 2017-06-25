(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/editlist', ['exports', 'jquery', 'bootbox'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'), require('bootbox'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jQuery, global.bootbox);
    global.PluginEditlist = mod.exports;
  }
})(this, function (exports, _jquery, _bootbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

  var _bootbox2 = babelHelpers.interopRequireDefault(_bootbox);

  var pluginName = 'editlist';
  var defaults = {};

  var editlist = function () {
    function editlist(element, options) {
      babelHelpers.classCallCheck(this, editlist);

      this.element = element;
      this.$element = (0, _jquery2.default)(element);
      this.$content = this.$element.find('.list-content');
      this.$text = this.$element.find('.list-text');
      this.$editable = this.$element.find('.list-editable');
      this.$editBtn = this.$element.find('[data-toggle=list-editable]');
      this.$delBtn = this.$element.find('[data-toggle=list-delete]');
      this.$closeBtn = this.$element.find('[data-toggle=list-editable-close]');
      this.$input = this.$element.find('input');
      this.options = _jquery2.default.extend({}, Plugin.defaults, options, this.$element.data());
      this.init();
    }

    babelHelpers.createClass(editlist, [{
      key: 'init',
      value: function init() {
        this.bind();
      }
    }, {
      key: 'bind',
      value: function bind() {
        var self = this;
        this.$editBtn.on('click', function () {
          self.enable();
        });

        this.$closeBtn.on('click', function () {
          self.disable();
        });

        this.$delBtn.on('click', function () {
          if (typeof _bootbox2.default === 'undefined') return;
          _bootbox2.default.dialog({
            message: "Do you want to delete the contact?",
            buttons: {
              success: {
                label: "Delete",
                className: "btn-danger",
                callback: function callback() {
                  // $(e.target).closest('.list-group-item').remove();
                }
              }
            }
          });
        });
        this.$input.on('keydown', function (e) {
          var keycode = e.keyCode ? e.keyCode : e.which;

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
    }, {
      key: 'enable',
      value: function enable() {
        this.$content.hide();
        this.$editable.show();
        this.$input.focus().select();
      }
    }, {
      key: 'disable',
      value: function disable() {
        this.$content.show();
        this.$editable.hide();
      }
    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(options) {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (typeof options === 'string') {
          var _ret = function () {
            var method = options;

            if (/^\_/.test(method)) {
              return {
                v: false
              };
            } else if (/^(get)$/.test(method)) {
              var api = _this.first().data(pluginName);
              if (api && typeof api[method] === 'function') {
                return {
                  v: api[method].apply(api, args)
                };
              }
            } else {
              return {
                v: _this.each(function () {
                  var api = _jquery2.default.data(this, pluginName);
                  if (api && typeof api[method] === 'function') {
                    api[method].apply(api, args);
                  }
                })
              };
            }
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
        } else {
          return this.each(function () {
            if (!_jquery2.default.data(this, pluginName)) {
              _jquery2.default.data(this, pluginName, new editlist(this, options));
            }
          });
        }
      }
    }]);
    return editlist;
  }();

  _jquery2.default.fn[pluginName] = editlist._jQueryInterface;
  _jquery2.default.fn[pluginName].constructor = editlist;
  _jquery2.default.fn[pluginName].noConflict = function () {
    'use strict';

    _jquery2.default.fn[pluginName] = window.JQUERY_NO_CONFLICT;
    return editlist._jQueryInterface;
  };

  exports.default = editlist;
});
