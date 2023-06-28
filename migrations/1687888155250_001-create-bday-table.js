exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('bday', {
    id: 'id',
    name: { type: 'string', notNull: true },
    username: { type: 'string', notNull: true },
    date: { type: 'date', notNull: true },
    month: { type: 'string', notNull: true },
    place: { type: 'string', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
