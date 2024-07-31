const { Pool } = require('pg');
const { nanoId } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    const userQuery = {
      text: 'SELECT id FROM users WHERE id = $1',
      values: [userId],
    };

    const userResult = await this._pool.query(userQuery);
    if (!userResult.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    const id = `collaboration-${nanoId(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, userId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Kolaborasi gagal ditambahkan');
    }

    return result.rows[0].id;
  }
}

module.exports = CollaborationsService;
