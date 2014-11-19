var util = require('util');
var Device = require('zetta').Device;

var Switch = module.exports = function(room) {
  this.room = room;
  Device.call(this);
};
util.inherits(Switch, Device);

Switch.prototype.init = function(config) {
  config
    .type('switch')
    .state('off')
    .when('off', { allow: ['turn-on'] })
    .when('on', { allow: ['turn-off'] })
    .map('turn-on', this.turnOn)
    .map('turn-off', this.turnOff);
};

Switch.prototype.turnOn = function(cb) {
  this.state = 'on';
  cb();
};

Switch.prototype.turnOff = function(cb) {
  this.state = 'off';
  cb();
};
