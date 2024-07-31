const Joi = require('joi');

const PostCOllaborationsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const DeleteCollaborationsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { PostCOllaborationsPayloadSchema, DeleteCollaborationsPayloadSchema };
