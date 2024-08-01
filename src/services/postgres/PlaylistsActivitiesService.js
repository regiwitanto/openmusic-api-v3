const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistsActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity({
    playlistId, songId, userId, action,
  }) {
    const id = `activity-${nanoid(16)}`;
    const time = new Date().toISOString();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO playlists_activities VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [
        id,
        playlistId,
        songId,
        userId,
        action,
        time,
        createdAt,
        updatedAt,
      ],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Activity gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getActivities(playlistId) {
    const query = {
      text: `SELECT pa.id, u.username, s.title, pa.action, pa.time
             FROM playlists_activities pa
             LEFT JOIN users u ON u.id = pa.user_id
             LEFT JOIN songs s ON s.id = pa.song_id
             WHERE pa.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rows) {
      throw new NotFoundError('Activity tidak ditemukan');
    }

    return result.rows.map((row) => ({
      id: row.id,
      username: row.username,
      title: row.title,
      action: row.action,
      time: row.time,
    }));
  }
}

module.exports = PlaylistsActivitiesService;
