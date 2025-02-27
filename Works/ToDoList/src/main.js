const button = document.getElementById('add-task')

button.onclick = addTask

function addTask() {
    const input = document.getElementById('task-name')
    if (input.value === '') {
        console.log('Пусто')
    }
    else {
        createTask(input.value)
    }
}

async function createTask(taskName) {
    let newTask = { 
        "text": `${taskName}`,
        "completed": "false" 
    }
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'applycation/json'
        },
        body: JSON.stringify(newTask)
    })

    render()
}

async function changeCompleted(id) {
    fetch(`http://localhost:3000/tasks/${id}`)
    .then(res => res.json())
    .then(task => {
        let isCompleted = task.completed === 'true' ? 'false' : 'true'
        console.log(isCompleted)
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'applycation/json'
            },
            body: JSON.stringify({"completed": `${isCompleted}`})
        })
    })
}

async function deleteTask(id) {
    fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'applycation/json'
        }
    })
}

async function render() {
    let response = await fetch('http://localhost:3000/tasks');

    if (response.ok) { 
        let data = await response.json();
        const tasksList = document.querySelector('.list')
        tasksList.innerHTML = ''

        for (let task of data) {
            
            tasksList.insertAdjacentElement('beforeend', getTask(task))
        }
    } else {
        alert("Ошибка HTTP: " + response.status);
    }    
}
render()

function getTask(task) {
    const div = document.createElement('article')
    div.className = task.completed === "true" ? 'completed-task' : 'task'
    div.id = task.id

    div.innerHTML = `
        <p>${task.text}</p>
        <div class="btns">
            <button class="task-done" data-index=${task.id} data-type="complete">+</button>
            <button class="task-delete"data-index=${task.id} data-type="remove">-</button>
        </div>
    `

    div.onclick = function(event) {
        if (event.target.dataset.index) {
            let type = event.target.dataset.type
            if (type === 'complete') {
                changeCompleted(event.target.dataset.index)
            } else if (type === 'remove') {
                deleteTask(event.target.dataset.index)
            }
        }
    }

    return div
}
