var util = require('util');
var Scout = require('zetta').Scout;
var Switch = require('./switch');

var SwitchScout = module.exports = function() {
  Scout.call(this);
  this.rooms = ['living-room', 'bedroom'];
};
util.inherits(SwitchScout, Scout);

SwitchScout.prototype.init = function(next) {
  for (var i = 0; i < this.rooms.length; i++) {
    var room = this.rooms[i];

    for (var j = 0; j < 3; j++) {
      this.discover(Switch, room);
    }
  }

  next();
};
