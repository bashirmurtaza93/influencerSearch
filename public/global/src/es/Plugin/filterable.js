import $ from 'jquery';
import Plugin from 'Plugin';

const NAME = 'filterable';

class Filterable extends Plugin {
  getName() {
    return NAME;
  }

  static getDefaults() {
    return {
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    };
  }

  render() {
    if (typeof $.fn.isotope === 'undefined') {
      return;
    }

    let $el = this.$el,
      options = $.extend(this.options, {
        filter: '*'
      });

    this.$el.isotope(options);
    this.$filters = $(options.filters);

    let self = this;

    $('[data-filter]', this.$filters).on('click', function(e) {
      let $this = $(this);
      let $li = $this.parent('li');

      $li.siblings().find('.nav-link.active').each(function() {
        $(this).attr('aria-expanded', false).removeClass('active');
      });

      $this.addClass('active').attr('aria-expanded', true);

      let filter = $this.attr('data-filter');
      if (filter !== '*') {
        filter = `[data-type="${filter}"]`;
      }
      self.$el.isotope({
        filter
      });

      e.preventDefault();
    });
  }
}

Plugin.register(NAME, Filterable);

export default Filterable;
