const PlaylistsSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistsSongs',
  version: '1.0.0',
  register: async (
    server,
    { playlistsService, playlistSongsService, validator }
  ) => {
    const playlistsSongsHandler = new PlaylistsSongsHandler(
      playlistsService,
      playlistSongsService,
      validator
    );
    server.route(routes(playlistsSongsHandler));
  },
};
