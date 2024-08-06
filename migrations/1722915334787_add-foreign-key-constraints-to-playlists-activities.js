/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.addConstraint(
    'playlists_activities',
    'fk_playlists_activities.playlist_id_playlists.id',
    'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'playlists_activities',
    'fk_playlists_activities.user_id_users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE'
  );

  pgm.addConstraint(
    'playlists_activities',
    'fk_playlists_activities.song_id_songs.id',
    'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE'
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropConstraint('playlists_activities', 'fk_playlists_activities.playlist_id_playlists.id');
  pgm.dropConstraint('playlists_activities', 'fk_playlists_activities.user_id_users.id');
  pgm.dropConstraint('playlists_activities', 'fk_playlists_activities.song_id_songs.id');
};
