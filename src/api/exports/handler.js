class ExportsHandler {
  constructor(producerService, playlistsService, validator) {
    this._producerService = producerService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postExportPlaylistHandler(request, h) {
    try {
      this._validator.validateExportPlaylistsPayload(request.payload);

      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId,
      );

      const message = {
        playlistId,
        targetEmail: request.payload.targetEmail,
      };

      await this._producerService.sendMessage(
        'export:playlists',
        JSON.stringify(message),
      );

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses',
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ExportsHandler;
