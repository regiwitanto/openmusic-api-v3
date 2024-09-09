const config = require('../../utils/config');

class AlbumsHandler {
  constructor(
    albumsService,
    albumsValidator,
    storageService,
    uploadsValidator,
  ) {
    this._albumsService = albumsService;
    this._albumsValidator = albumsValidator;
    this._storageService = storageService;
    this._uploadsValidator = uploadsValidator;
  }

  async postAlbumHandler(request, h) {
    try {
      this._albumsValidator.validateAlbumPayload(request.payload);

      const { name, year } = request.payload;

      const albumId = await this._albumsService.addAlbum({
        name,
        year,
      });

      const response = h.response({
        status: 'success',
        data: {
          albumId,
        },
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const album = await this._albumsService.getAlbumById(id);

      const response = h.response({
        status: 'success',
        data: {
          album,
        },
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async putAlbumByIdHandler(request, h) {
    try {
      this._albumsValidator.validateAlbumPayload(request.payload);

      const { id } = request.params;

      await this._albumsService.editAlbumById(id, request.payload);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil diperbarui',
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._albumsService.deleteAlbumById(id);

      const response = h.response({
        status: 'success',
        message: 'Album berhasil dihapus',
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async postAlbumCoverHandler(request, h) {
    try {
      const { id } = request.params;
      const { cover } = request.payload;

      this._uploadsValidator.validateImageHeaders(cover.hapi.headers);

      const filename = await this._storageService.writeFile(cover, cover.hapi);

      const fileLocation = `http://${config.app.host}:${config.app.port}/albums/images/${filename}`;

      await this._albumsService.editAlbumCoverById(fileLocation, id);

      const response = h.response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async postAlbumLikeByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.addAlbumLikeById(id, credentialId);

      const response = h.response({
        status: 'success',
        message: 'Like berhasil ditambahkan',
      });
      response.code(201);

      return response;
    } catch (error) {
      return error;
    }
  }

  async deleteAlbumLikeByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.deleteAlbumLikeById(id, credentialId);

      const response = h.response({
        status: 'success',
        message: 'Like berhasil dihapus',
      });
      response.code(200);

      return response;
    } catch (error) {
      return error;
    }
  }

  async getAlbumLikesByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const likeData = await this._albumsService.getAlbumLikesById(id);

      const { likes, source } = likeData;

      const response = h.response({
        status: 'success',
        data: {
          likes,
        },
      });
      response.code(200);
      response.header('X-Data-Source', source);

      return response;
    } catch (error) {
      return error;
    }
  }
}

module.exports = AlbumsHandler;
