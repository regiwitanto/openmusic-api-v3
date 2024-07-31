const InvariantError = require('../../exceptions/InvariantError');
const { PostCOllaborationsPayloadSchema } = require('./schema');

const CollaborationsValidator = {
  validatePostCollaborationsPayload: (payload) => {
    const validationResult = PostCOllaborationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeleteCollaborationsPayload: (payload) => {
    const validationResult = PostCOllaborationsPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
