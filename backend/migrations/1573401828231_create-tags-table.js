/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('tags', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
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
  pgm.dropTable('tags', options);
};
