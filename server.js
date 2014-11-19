var zetta = require('zetta');
var SwitchScout = require('./switch_scout');
var roomsApp = require('./rooms_app');

zetta()
  .use(SwitchScout)
  .use(roomsApp)
  .listen(1337);
