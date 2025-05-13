const taskModel = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  const userId = req.user.id;
  taskModel.getAllByUserId(userId, (err, tasks) => {
    if (err) return res.status(500).json({ error: 'Error fetching tasks' });
    res.json(tasks);
  });
};

exports.getTaskById = (req, res) => {
  taskModel.getById(req.params.id, (err, task) => {
    if (err) return res.status(500).json({ error: 'Error fetching task' });
    res.json(task);
  });
};

exports.createTask = (req, res) => {
  const user = req.user;
  const task = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date || null,
    status: req.body.status || 'Pending',
    remarks: req.body.remarks || '',
    created_on: new Date(),
    created_by_name: user.username,
    created_by_id: user.id,
    updated_on: new Date(),
    updated_by_name: user.username,
    updated_by_id: user.id,
  };

  taskModel.create(task, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error creating task' });
    res.status(201).json({ message: 'Task created successfully', id: result.insertId });
  });
};

exports.updateTask = (req, res) => {
  const id = req.params.id;
  const updatedData = {
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date ? new Date(req.body.due_date) : null,
    status: req.body.status,
    remarks: req.body.remarks,
    updated_by_name: req.user.username,
    updated_by_id: req.user.id,
    updated_on: new Date(),
  };

  taskModel.update(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error updating task' });
    res.json({ message: 'Task updated successfully' });
  });
};

exports.deleteTask = (req, res) => {
  taskModel.remove(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error deleting task' });
    res.json({ message: 'Task deleted successfully' });
  });
};

exports.searchTasks = (req, res) => {
  const q = req.query.q || '';
  taskModel.search(q, req.user.id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    res.json(results);
  });
};
