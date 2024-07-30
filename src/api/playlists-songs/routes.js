const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.postPlaylistsSongsHandler(request, h),
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.getPlaylistsSongsHandler(request, h),
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{playlistId}/songs',
    handler: (request, h) => handler.deletePlaylistsSongsHandler(request, h),
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
