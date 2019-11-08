/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('article_comments', {
    id: 'id',
    comment: { type: 'varchar(1000)', notNull: true },
    articleId: { type: 'integer', notNull: true },
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
  pgm.dropTable('article_comments', options);
};
