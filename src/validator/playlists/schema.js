const Joi = require('joi');

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

module.exports = { PlaylistPayloadSchema };
