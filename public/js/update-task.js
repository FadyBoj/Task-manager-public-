const form = document.querySelector('form');
const nameInput = document.querySelector('.nameInput');
const checkInput = document.querySelector('.checkInput');
const id = document.querySelector('.id').textContent;
const submitBtn = document.querySelector('.submitBtn');
const socket = io();
form.addEventListener('submit',async (e) =>{

    e.preventDefault();

    const options = 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name:nameInput.value,completed:checkInput.checked}),
    }

    const response = await fetch(`/api/tasks/${id}`,options);
    const Data = await response.json();
    socket.emit('taskChanged','msg');
    submitBtn.textContent = 'Loading...'
    window.location.href = "/";
})

