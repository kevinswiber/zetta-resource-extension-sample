var RoomsResource = require('./rooms_resource');

module.exports = function(server) {
  var argo = server.httpServer.cloud;
  argo.add(RoomsResource, server);
};
