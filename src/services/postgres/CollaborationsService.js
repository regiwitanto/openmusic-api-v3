const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CollaborationsService {
  constructor() {
    this._pool = new Pool();
  }

  async addCollaboration(playlistId, userId) {
    const userQuery = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [userId],
    };

    const userResult = await this._pool.query(userQuery);
    if (!userResult.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    const id = `collaboration-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const insertQuery = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, playlistId, userId, createdAt, updatedAt],
    };

    const insertResult = await this._pool.query(insertQuery);
    if (!insertResult.rows.length) {
      throw new InvariantError('Kolaborasi gagal ditambahkan');
    }

    return insertResult.rows[0].id;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Kolaborasi gagal dihapus. Id tidak ditemukan');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Kolaborasi gagal diverifikasi');
    }
  }
}

module.exports = CollaborationsService;
