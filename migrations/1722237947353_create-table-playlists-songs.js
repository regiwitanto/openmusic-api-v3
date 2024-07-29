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
  pgm.createTable('playlists_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('playlists_songs', 'unique_playlist_id_and_song_id', {
    unique: ['playlist_id', 'song_id'],
  });

  pgm.addConstraint(
    'playlists_songs',
    'fk_playlists_songs.playlist_id_playlists.id_on_delete_cascade',
    {
      foreignKeys: {
        columns: 'playlist_id',
        references: 'playlists',
        referencesConstraintName: 'fk_playlists_songs.playlist_id_playlists.id',
        onDelete: 'CASCADE',
      },
    }
  );

  pgm.addConstraint(
    'playlists_songs',
    'fk_playlists_songs.song_id_songs.id_on_delete_cascade',
    {
      foreignKeys: {
        columns: 'song_id',
        references: 'songs',
        referencesConstraintName: 'fk_playlists_songs.song_id_songs.id',
        onDelete: 'CASCADE',
      },
    }
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('playlists_songs');
};
