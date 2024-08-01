const InvariantError = require('../../exceptions/InvariantError');
const {
  PostPlaylistsSongsPayloadSchema,
  DeletePlaylistsSongsPayloadSchema,
} = require('./schema');

const PlaylistsSongsValidator = {
  validatePostPlaylistsSongsPayload: (payload) => {
    const validationResult = PostPlaylistsSongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeletePlaylistsSongsPayload: (payload) => {
    const validationResult = DeletePlaylistsSongsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsSongsValidator;
