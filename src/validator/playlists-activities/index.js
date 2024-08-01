const InvariantError = require('../../exceptions/InvariantError');
const { getPlaylistsActivitiesPayloadSchema } = require('./schema');

const PlaylistsActivitiesValidator = {
  validateGetPlaylistsActivitiesPayload: (payload) => {
    const validationResult = getPlaylistsActivitiesPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsActivitiesValidator;
