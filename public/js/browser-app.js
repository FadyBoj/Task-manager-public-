const tasksDiv = document.getElementsByClassName('tasks');
const createTaskBtn = document.querySelector('.createTaskBtn')
const taskinput = document.querySelector('.taskInput');
const form = document.querySelector('form');
const trashIcon = document.getElementsByClassName('trashIcon');
const domTasks = document.getElementsByClassName('task')

const socket = io();


const getTasks = async()=>{
 
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    console.log(tasks);



    for(let i = 0; i < tasks.length; i++){
 
    let comClass = "";
    let checkIcon = "";
    if(tasks[i].completed === true)
    {
        comClass = "completed";
        checkIcon = `<ion-icon class="doneIcon icon" name="checkmark-circle-outline"></ion-icon>`;
    }
    const task = document.createElement('div');
    task.innerHTML = `
                <div class="col-1 col">
                    ${checkIcon}
                    <div class="${comClass}">${tasks[i].name}</div>
                </div>

                <div class="col-2 col">
                    <a href='/api/tasks/${tasks[i]._id}'><ion-icon class="editIcon icon" name="create-outline"></ion-icon></a>
                    <div class="trashIcon"><p style="display:none">${tasks[i]._id}</p><ion-icon class="deleteIcon icon" name="trash-outline"></ion-icon></div>
                </div>
            
    `
    task.classList.add('task')
    tasksDiv[0].appendChild(task)
    }
    deleteFunctionality();
}

getTasks();


form.addEventListener('submit',async(e)=>{

    e.preventDefault();
    if(!(taskinput.value.length === 0)){
    const Data = {name:taskinput.vlaue};
        
    const options = 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:taskinput.value}),
    }

    const response = await fetch('/api/tasks',options);
    const taskRes = await response.json();
    console.log(taskRes);

    const task = document.createElement('div');
    task.innerHTML = `
                <div class="col-1 col">
                    <div>${taskRes.name}</div>
                </div>

                <div class="col-2 col">
                    <a href='/api/tasks/${taskRes._id}'><ion-icon class="editIcon icon" name="create-outline"></ion-icon></a>
                    <div class="trashIcon"><p style="display:none">${taskRes._id}</p><ion-icon class="deleteIcon icon" name="trash-outline"></ion-icon></div>
                </div>
            
    `
    task.classList.add('task')
    taskinput.value = "";   
    tasksDiv[0].appendChild(task);
    deleteFunctionality();
    socket.emit('taskChanged','msg');

    }
    else return;
})



function deleteFunctionality(){
    const tasks = document.getElementsByClassName('task');

    for(let k = 0; k < trashIcon.length; k++)
    {
        let ID = trashIcon[k].firstElementChild.textContent;
        const options = 
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ID}),
        }

        trashIcon[k].addEventListener('click', async()=>{
            tasks[k].classList.add('taskDeleted');
            setTimeout(function(){tasks[k].style.display="none";},200)
            const response = await fetch(`/api/tasks/${ID}`,options);
            const data = response.json();
            socket.emit('taskChanged','msg');
        })
    }
    

}


socket.on('connect', () => {
    console.log(`Socket connected with id ${socket.id}`);
    const sender = socket.id;
    socket.emit('join', sender);;
  });


socket.on('taskChanged',(msg)=>{
    
    while(tasksDiv[0].children[0])
    tasksDiv[0].removeChild(tasksDiv[0].children[0])
    getTasks();
})