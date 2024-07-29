const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistsSongsPayloadSchema } = require('./schema');

const PlaylistsSongsValidator = {
  validatePostPlaylistsSongsPayload: (payload) => {
    const validationResult = PostPlaylistsSongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsSongsValidator;
