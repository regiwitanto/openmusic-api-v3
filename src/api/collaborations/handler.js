class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    try {
      this._validator.validatePostCollaborationsPayload(request.payload);
      const { playlistId, userId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId,
      );
      const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

      const response = h.response({
        status: 'success',
        data: {
          collaborationId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteCollaborationHandler(request, h) {
    try {
      this._validator.validateDeleteCollaborationsPayload(request.payload);
      const { playlistId, userId } = request.payload;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistOwner(
        playlistId,
        credentialId,
      );
      await this._collaborationsService.deleteCollaboration(playlistId, userId);

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = CollaborationsHandler;
