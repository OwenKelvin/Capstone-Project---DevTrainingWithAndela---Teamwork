/* eslint-disable camelcase */

exports.up = pgm => {
  pgm.createTable('article_tag', {
    articleId: { type: 'integer', notNull: true },
    tagId: { type: 'integer', notNull: true },
  });
};

exports.down = pgm => {
  const options = {
    ifExists: true,
  };
  pgm.dropTable('article_tag', options);
};
