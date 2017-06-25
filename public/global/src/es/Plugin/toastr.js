// import $ from 'jquery';
import Plugin from 'Plugin';

const NAME = 'toastr';

class Toastr extends Plugin {
  getName() {
    return NAME;
  }

  render() {
    this.$el.data('toastrWrapApi', this);
  }

  show(e) {
    if (typeof toastr === 'undefined') {
      return;
    }

    e.preventDefault();

    let options = this.options;
    let message = options.message || '';
    let type = options.type || 'info';
    let title = options.title || undefined;

    switch (type) {
      case 'success':
        toastr.success(message, title, options);
        break;
      case 'warning':
        toastr.warning(message, title, options);
        break;
      case 'error':
        toastr.error(message, title, options);
        break;
      case 'info':
        toastr.info(message, title, options);
        break;
      default:
        toastr.info(message, title, options);
    }
  }
  static api() {
    return 'click|show';
  }
}

Plugin.register(NAME, Toastr);

export default Toastr;
