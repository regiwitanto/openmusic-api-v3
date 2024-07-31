class PlaylistsHandler {
  constructor(playlistsService, validator) {
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePostPlaylistPayload(request.payload);

      const { name } = request.payload;

      const { id: credentialId } = request.auth.credentials;

      const playlistId = await this._playlistsService.addPlaylist({
        name,
        owner: credentialId,
      });

      const response = h.response({
        status: 'success',
        data: {
          playlistId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getPlaylistsHandler(request, h) {
    try {
      const { id: credentialId } = request.auth.credentials;
      const playlists = await this._playlistsService.getPlaylists(credentialId);

      const response = h.response({
        status: 'success',
        data: {
          playlists,
        },
      });
      response.code = 200;

      return response;
    } catch (error) {
      return error;
    }
  }

  async deletePlaylistByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(id, credentialId);
      await this._playlistsService.deletePlaylistById(id);

      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil dihapus',
      });
      response.code = 200;

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = PlaylistsHandler;
