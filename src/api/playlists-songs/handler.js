class PlaylistsSongsHandler {
  constructor(
    playlistsService,
    playlistsSongsService,
    validator,
    playlistsActivitiesService,
  ) {
    this._playlistsService = playlistsService;
    this._playlistsSongsService = playlistsSongsService;
    this._validator = validator;
    this._playlistsActivitiesService = playlistsActivitiesService;
  }

  async postPlaylistsSongsHandler(request, h) {
    try {
      this._validator.validatePostPlaylistsSongsPayload(request.payload);

      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId,
      );
      await this._playlistsSongsService.addSongToPlaylist(playlistId, songId);
      await this._playlistsActivitiesService.addActivity({
        playlistId,
        songId,
        userId: credentialId,
        action: 'add',
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getPlaylistsSongsHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId,
      );
      const playlist = await this._playlistsSongsService.getSongsFromPlaylist(
        playlistId,
      );

      const response = h.response({
        status: 'success',
        data: {
          playlist,
        },
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async deletePlaylistsSongsHandler(request, h) {
    try {
      this._validator.validateDeletePlaylistsSongsPayload(request.payload);

      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId,
      );
      await this._playlistsSongsService.deleteSongFromPlaylist(
        playlistId,
        songId,
      );
      await this._playlistsActivitiesService.addActivity({
        playlistId,
        songId,
        userId: credentialId,
        action: 'delete',
      });

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist',
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = PlaylistsSongsHandler;
