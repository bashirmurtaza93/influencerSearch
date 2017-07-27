(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('/Plugin/gmaps', ['exports', 'Plugin', 'Config'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('Plugin'), require('Config'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Plugin, global.Config);
    global.PluginGmaps = mod.exports;
  }
})(this, function (exports, _Plugin2, _Config) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _Plugin3 = babelHelpers.interopRequireDefault(_Plugin2);

  var Config = babelHelpers.interopRequireWildcard(_Config);
  // import $ from 'jquery';
  var NAME = 'gmaps';

  var GmapsPlugin = function (_Plugin) {
    babelHelpers.inherits(GmapsPlugin, _Plugin);

    function GmapsPlugin() {
      babelHelpers.classCallCheck(this, GmapsPlugin);
      return babelHelpers.possibleConstructorReturn(this, (GmapsPlugin.__proto__ || Object.getPrototypeOf(GmapsPlugin)).apply(this, arguments));
    }

    babelHelpers.createClass(GmapsPlugin, [{
      key: 'getName',
      value: function getName() {
        return NAME;
      }
    }, {
      key: 'render',
      value: function render() {}
    }], [{
      key: 'getDefaults',
      value: function getDefaults() {
        return {
          styles: [{
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '700')
            }]
          }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '500')
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{
              color: Config.colors('blue-grey', '300')
            }]
          }, {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{
              color: '#e0e0e0'
            }]
          }, {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{
              color: Config.colors('blue-grey', '200')
            }]
          }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
              color: '#000000'
            }]
          }, {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '500')
            }]
          }, {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'poi.attraction',
            elementType: 'labels.text.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'poi',
            elementType: 'labels.text.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'road.local',
            elementType: 'all',
            stylers: [{
              color: Config.colors('blue-grey', '200')
            }, {
              weight: 0.5
            }]
          }, {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [{
              color: Config.colors('blue-grey', '300')
            }]
          }, {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{
              visibility: 'off'
            }, {
              color: '#000000'
            }]
          }, {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{
              visibility: 'off'
            }, {
              color: '#000000'
            }]
          }, {
            featureType: 'poi',
            elementType: 'labels.text',
            stylers: [{
              visibility: 'on'
            }, {
              color: Config.colors('blue-grey', '700')
            }]
          }, {
            featureType: 'road.local',
            elementType: 'labels.text',
            stylers: [{
              color: Config.colors('blue-grey', '700')
            }]
          }, {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{
              color: Config.colors('blue-grey', '100')
            }]
          }, {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '500')
            }]
          }, {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: [{
              visibility: 'off'
            }]
          }, {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '600')
            }]
          }, {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text',
            stylers: [{
              color: Config.colors('blue-grey', '700')
            }]
          }, {
            featureType: 'poi',
            elementType: 'labels.text.stroke',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [{
              visibility: 'on'
            }, {
              hue: '#ffffff'
            }, {
              saturation: -100
            }, {
              lightness: 50
            }]
          }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{
              visibility: 'on'
            }, {
              color: '#ffffff'
            }]
          }, {
            featureType: 'administrative.neighborhood',
            elementType: 'labels.text.stroke',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [{
              color: '#ffffff'
            }]
          }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{
              color: Config.colors('blue-grey', '600')
            }]
          }]
        };
      }
    }]);
    return GmapsPlugin;
  }(_Plugin3.default);

  _Plugin3.default.register(NAME, GmapsPlugin);

  exports.default = GmapsPlugin;
});
