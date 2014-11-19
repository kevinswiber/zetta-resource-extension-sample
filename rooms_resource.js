var RoomsResource = module.exports = function(server) {
  this.server = server;
  this.rooms = {};
};

RoomsResource.prototype.init = function(config) {
  config
    .path('/rooms')
    .get('/', this.list)
    .get('/{id}', this.show);

  var query = this.server
    .ql('where type=@type and room is not missing')
    .params({ type: 'switch' });

  var self = this;
  this.server.observe(query, function(device) {
    var id = device.room;
    if (!self.rooms.hasOwnProperty(id)) {
      self.rooms[id] = [];
    }

    var switchItem = {
      id: device.id,
      state: device.state
    };

    self.rooms[id].push(switchItem);

    var index = self.rooms[id].length - 1;

    device.on('turn-on', function() {
      self.rooms[id][index].state = device.state;
    });

    device.on('turn-off', function() {
      self.rooms[id][index].state = device.state;
    });
  });
};

RoomsResource.prototype.list = function(env, next) {
  env.response.body = this.rooms;
  next(env);
};

RoomsResource.prototype.show = function(env, next) {
  var id = env.route.params.id;
  if (this.rooms.hasOwnProperty(id)) {
    env.response.body = { id: id, switches: this.rooms[id] };
  } else {
    env.response.statusCode = 404;
  }

  next(env);
};
