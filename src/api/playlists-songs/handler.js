class PlaylistsSongsHandler {
  constructor(playlistsService, playlistSongsService, validator) {
    this._playlistsService = playlistsService;
    this._playlistSongsService = playlistSongsService;
    this._validator = validator;
  }

  async postPlaylistsSongHandler(request, h) {
    this._validator.validatePlaylistsSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(
      playlistId,
      request.auth.credentials.id
    );
    const playlistsongId = await this._playlistSongsService.addSongToPlaylist(
      playlistId,
      songId
    );

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
      data: {
        playlistsongId,
      },
    });
    response.code(201);
    return response;
  }

  async getPlaylistsSongsHandler(request) {
    const { playlistId } = request.params;
    await this._playlistsService.verifyPlaylistAccess(
      playlistId,
      request.auth.credentials.id
    );
    const songs = await this._playlistSongsService.getSongsFromPlaylist(
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
    this._validator.validatePlaylistsSongPayload(request.payload);
    const { playlistId } = request.params;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(
      playlistId,
      request.auth.credentials.id
    );
    await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}
