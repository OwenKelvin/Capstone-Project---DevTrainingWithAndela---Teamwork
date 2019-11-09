/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('gifs', {
    id: 'id',
    title: { type: 'varchar(1000)', notNull: true },
    userId: { type: 'integer', notNull: true },
    url: { type: 'varchar(1000)', notNull: false },
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
  pgm.dropTable('gifs', options);
};
