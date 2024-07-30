class PlaylistsSongsHandler {
  constructor(playlistsService, playlistsSongsService, validator) {
    this._playlistsService = playlistsService;
    this._playlistsSongsService = playlistsSongsService;
    this._validator = validator;
  }

  async postPlaylistsSongHandler(request, h) {
    try {
      this._validator.validatePostPlaylistsSongsPayload(request.payload);
      const { playlistId } = request.params;
      const { songId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId
      );
      const playlistsSongsId =
        await this._playlistsSongsService.addSongToPlaylist(playlistId, songId);

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
        data: {
          playlistsSongsId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      console.log("🚀 ~ file: handler.js:32 ~ PlaylistsSongsHandler ~ postPlaylistsSongHandler ~ error:", error)
      return error;
    }
  }

  async getPlaylistsSongsHandler(request) {
    const { playlistId } = request.params;
    await this._playlistsService.verifyPlaylistAccess(
      playlistId,
      request.auth.credentials.id
    );
    const songs = await this._playlistsSongsService.getSongsFromPlaylist(
      playlistId
    );

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async deletePlaylistsSongHandler(request) {
    this._validator.validateDeletePlaylistsSongsPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(
      playlistId,
      request.auth.credentials.id
    );
    await this._playlistsSongsService.deleteSongFromPlaylist(
      playlistId,
      songId
    );

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistsSongsHandler;
