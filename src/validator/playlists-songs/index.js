const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistSongsPayloadSchema } = require('./schema');

const PlaylistsSongsValidator = {
  validatePostPlaylistSongsPayload: (payload) => {
    const validationResult = PostPlaylistSongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsSongsValidator;
