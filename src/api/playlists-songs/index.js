const PlaylistsSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsSongs',
  version: '1.0.0',
  register: async (
    server,
    {
      playlistsService,
      playlistsSongsService,
      validator,
      playlistsActivitiesService,
    },
  ) => {
    const playlistsSongsHandler = new PlaylistsSongsHandler(
      playlistsService,
      playlistsSongsService,
      validator,
      playlistsActivitiesService,
    );
    server.route(routes(playlistsSongsHandler));
  },
};
