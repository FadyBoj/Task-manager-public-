const express = require('express');
const router = express.Router();



const {
    getTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
} = require('./../controllers/tasks-controllers');

router.route('/').get(getTasks).post(createTask);

router.route('/:id').get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;