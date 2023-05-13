const Task = require('./../models/task');
const path = require('path');

const root = (req,res) =>{
    res.sendFile(path.resolve(__dirname + './../public/index.html'));
}

const getTasks = async (req,res) =>{
    try {
        const tasks = await Task.find({});
        if(tasks.length === 0)
        {
            return res.json({msg:"It's quite here...."});
        }
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({msg:error});
    }
}

const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({msg:error});
    }
   
}

const getSingleTask = async (req,res) =>{
    try {
        const {id:taskID} = req.params;
        const task = await Task.findOne({_id:taskID});
        if(!task)
        {
            return res.status(404).send(`There's no task with the id: ${taskID}`);
        }

        res.render('task.ejs',{singleTask:task});

    } catch (error) {
        res.status(404).json({msg:error});
    }
}

const updateTask = async (req,res) =>{
    const {id} = req.params;
    const query = {_id:id};
    try {
        await Task.findOneAndUpdate(query,req.body);
        res.status(200).json({msg:'Success'});
    } catch (error) {
        res.status(401).json({msg:error});

    }

}

const deleteTask = async (req,res) =>{
    const {id} = req.params;
    await Task.findByIdAndDelete({_id:id});
    res.status(200).json({msg:"Successfully Deleted the task"});
}

module.exports = {
    getTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
    root
}