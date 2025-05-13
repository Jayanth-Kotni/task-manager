const db = require('../db');

exports.getAllByUserId = (userId, callback) => {
  db.query('SELECT * FROM tasks WHERE created_by_id = ?', [userId], callback);
};

exports.getById = (id, callback) => {
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

exports.create = (task, callback) => {
  db.query('INSERT INTO tasks SET ?', task, callback);
};

exports.update = (id, updatedData, callback) => {
  db.query('UPDATE tasks SET ? WHERE id = ?', [updatedData, id], (err, result) => {
    if (err) {
      console.error('DB Update Error:', err.sqlMessage || err);
      return callback(err);
    }
    callback(null, result);
  });
};

exports.remove = (id, callback) => {
  db.query('DELETE FROM tasks WHERE id = ?', [id], callback);
};

exports.search = (query, userId, callback) => {
  const likeQuery = `%${query}%`;
  db.query(
    'SELECT * FROM tasks WHERE created_by_id = ? AND (title LIKE ? OR description LIKE ?)',
    [userId, likeQuery, likeQuery],
    callback
  );
};
