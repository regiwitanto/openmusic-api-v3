const PlaylistsActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsActivities',
  version: '1.0.0',
  register: async (
    server,
    { playlistsService, playlistsActivitiesService, validator },
  ) => {
    const playlistsActivitiesHandler = new PlaylistsActivitiesHandler(
      playlistsService,
      playlistsActivitiesService,
      validator,
    );
    server.route(routes(playlistsActivitiesHandler));
  },
};
