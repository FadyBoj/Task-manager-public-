const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const Task = require('./models/task');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const changeStream = Task.watch();

io.on('connection',socket=>{


    socket.on('taskChanged',msg=>{
        socket.broadcast.emit('taskChanged','NULL');
    })
        
   
})

const root = require('./routes/root-route');
const tasks = require('./routes/tasks-route');

app.use(bodyParser.urlencoded({
    extended:false
}))


app.use(express.json());
app.use(express.static('public'));

app.set('view engine','ejs');

app.use('/api/tasks',tasks);
app.use('/',root)


const port = 3000;

const start = async ()=>{

    try {
        await connectDB(process.env.MONGO_URI);

    http.listen(port,()=>{
        console.log(`Server is running on port ${port}...`);
    })
        
    } catch (error) {
        console.log(error)
    }
    
}

start()