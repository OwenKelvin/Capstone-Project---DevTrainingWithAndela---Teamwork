/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('articles', {
    id: 'id',
    title: { type: 'varchar(1000)', notNull: true },
    article: { type: 'varchar(1000)', notNull: true },
    userId: { type: 'integer', notNull: true },
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
  pgm.dropTable('articles', options);
};
