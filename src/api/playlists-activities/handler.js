class PlaylistsActivitiesHandler {
  constructor(playlistsService, playlistsActivitiesService, validator) {
    this._playlistsService = playlistsService;
    this._playlistsActivitiesService = playlistsActivitiesService;
    this._validator = validator;
  }

  async getPlaylistsActivitiesHandler(request, h) {
    try {
      const { playlistId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._playlistsService.verifyPlaylistAccess(
        playlistId,
        credentialId,
      );

      const activities = await this._playlistsActivitiesService.getActivities(
        playlistId,
      );

      const response = h.response({
        status: 'success',
        data: {
          playlistId,
          activities: activities.map((activity) => ({
            username: activity.username,
            title: activity.title,
            action: activity.action,
            time: activity.time,
          })),
        },
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = PlaylistsActivitiesHandler;
