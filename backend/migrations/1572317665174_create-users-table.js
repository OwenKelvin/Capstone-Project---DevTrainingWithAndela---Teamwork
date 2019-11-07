exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    firstName: { type: 'varchar(1000)', notNull: true },
    lastName: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(1000)', notNull: true },
    password: { type: 'varchar(1000)', notNull: true },
    gender: { type: 'varchar(1000)', notNull: false },
    jobRole: { type: 'varchar(1000)', notNull: false },
    department: { type: 'varchar(1000)', notNull: false },
    address: { type: 'varchar(1000)', notNull: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updatedAt: {
      type: 'timestamp',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  const options = {
    ifExists: true,
  };
  pgm.dropTable('users', options);
};
