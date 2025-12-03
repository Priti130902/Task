const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Create task
router.post('/', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user.id });
    await task.save();
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

// Get user's tasks
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user.id }).sort({ createdAt: -1});
    res.json(tasks);
  } catch (err) { res.status(500).send('Server error'); }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    if (task.owner.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorised' });
    task = await Task.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(task);
  } catch (err) { res.status(500).send('Server error'); }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorised' });
    }

    // ⬇️ YAHAN PEHLE findByIdAndRemove tha – USE CHANGE KARO
    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task deleted successfully' });
  } catch (err) {
    console.error('DELETE ERROR => ', err.message);   // yeh log bhi add kar do
    res.status(500).json({ msg: 'Server error during delete' });
  }
});


module.exports = router;
