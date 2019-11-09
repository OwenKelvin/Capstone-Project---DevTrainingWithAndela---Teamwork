/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('gif_comments', {
    id: 'id',
    comment: { type: 'varchar(1000)', notNull: true },
    gifId: { type: 'integer', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: false,
    },
  });
};

exports.down = pgm => {
  const options = {
    ifExists: true,
  };
  pgm.dropTable('gif_comments', options);
};
