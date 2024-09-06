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

  async postAlbumCoverHandler(req, h) {
    try {
      const { id } = req.params;
      const { cover } = req.payload;
      this._uploadsValidator.validateImageHeaders(cover.hapi.headers);

      const filename = await this._storageService.writeFile(cover, cover.hapi);
      const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/images/${filename}`;
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
}

module.exports = AlbumsHandler;
