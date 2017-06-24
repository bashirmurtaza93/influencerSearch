// import $ from 'jquery';
import Plugin from 'Plugin';
import * as Config from 'Config';

const NAME = 'gauge';

class GaugePlugin extends Plugin {

  getName() {
    return NAME;
  }

  static getDefaults() {
    return {
      lines: 12,
      angle: 0.12,
      lineWidth: 0.4,
      pointer: {
        length: 0.68,
        strokeWidth: 0.03,
        color: Config.colors('blue-grey', 400)
      },
      limitMax: true,
      colorStart: Config.colors('blue-grey', 200),
      colorStop: Config.colors('blue-grey', 200),
      strokeColor: Config.colors('primary', 500),
      generateGradient: true
    };
  }

  render() {
    if (!Gauge) {
      return;
    }

    let $el = this.$el;
    let $canvas = $el.find('canvas'),
      $text = $el.find('.gauge-label');

    if ($canvas.length === 0) {
      return;
    }

    let gauge = new Gauge($canvas[0]).setOptions(this.options);

    $el.data('gauge', gauge);

    gauge.animationSpeed = 50;
    gauge.maxValue = $el.data('max-value');

    gauge.set($el.data('value'));

    if ($text.length > 0) {
      gauge.setTextField($text[0]);
    }
  }
}

Plugin.register(NAME, GaugePlugin);

export default GaugePlugin;
