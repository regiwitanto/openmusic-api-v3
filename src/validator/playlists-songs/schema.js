const Joi = require('joi');

const PostPlaylistsSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeletePlaylistsSongsPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = {
  PostPlaylistsSongsPayloadSchema,
  DeletePlaylistsSongsPayloadSchema,
};
