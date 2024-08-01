class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postSongHandler(request, h) {
    try {
      this._validator.validateSongPayload(request.payload);

      const {
        title, year, performer, genre, duration, albumId,
      } = request.payload;

      const songId = await this._service.addSong({
        title,
        year,
        performer,
        genre,
        duration,
        albumId,
      });

      const response = h.response({
        status: 'success',
        data: {
          songId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getSongsHandler(request, h) {
    try {
      const { title, performer } = request.query;

      const songs = await this._service.getSongs({ title, performer });

      const response = h.response({
        status: 'success',
        data: {
          songs,
        },
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const song = await this._service.getSongById(id);

      const response = h.response({
        status: 'success',
        data: {
          song,
        },
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async putSongByIdHandler(request, h) {
    this._validator.validateSongPayload(request.payload);

    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    const response = h.response({
      status: 'success',
      message: 'lagu berhasil diperbarui',
    });
    response.code(200);

    return response;
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    const response = h.response({
      status: 'success',
      message: 'lagu berhasil dihapus',
    });
    response.code(200);

    return response;
  }
}

module.exports = SongsHandler;
