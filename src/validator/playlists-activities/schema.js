const Joi = require('joi');

const getPlaylistsActivitiesPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
});

module.exports = { getPlaylistsActivitiesPayloadSchema };
