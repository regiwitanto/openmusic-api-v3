const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists',
    handler: (request, h) => handler.postExportPlaylistHandler(request, h),
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

module.exports = routes;
