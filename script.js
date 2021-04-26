let taskList = document.querySelector('.task-list')
let save = document.querySelector('.save')
let taskDescription = document.querySelector('.task-description')
let taskPriority = document.querySelector('.task-priority')
let taskAssign = document.querySelector('.task-assign')
let taskForm = document.querySelector('.form-add')

save.addEventListener('click', (e) => saveTasks(e))

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function saveTasks(event) {
    event.preventDefault()

    if (taskDescription.value.length > 0 && taskAssign.value.length > 0) {
        let tasks = getTasks()
        let newTasks = {
            id: +new Date(),
            description: taskDescription.value,
            isOpen: true,
            assignedPerson: taskAssign.value,
            status: taskPriority.value

        }
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTasks]))
        taskForm.reset()
        view()

    }


}

function view() {
//     let tasks = [{
//         id: 'Номер задачи: ytre-43453-ytre-5433-gddsfv',
//         description: 'Закончить верстку проекта',
//         isOpen: 'Открыта',
//         assignedPerson: 'Ivan ivanov',
//         status: 'Срочно'
//
//     }]
    taskList.innerHTML = ''
    let tasks = getTasks()
    tasks.forEach(task => {
        taskList.innerHTML += `<div class="p-5 mb-3">
        <h6>Номер задачи: ${task.id}</h6>
        <span class="badge ${task.isOpen ? 'bg-primary' : 'bg-secondary'} ">${task.isOpen ? 'открыто' : 'закрыто'}</span>
        <h3 class="my-4">${task.description}</h3>
        <div class="status">
            <i class="far fa-clock"></i>
            <span class="text-danger">${task.status}</span>
        </div>

        <div class="assign mb-3">
            <i class="far fa-user-circle"></i>
            <span > ${task.assignedPerson}</span>
        </div>
           <button type="button" class="btn cls-btn ${task.isOpen ? 'btn-success' : 'btn-warning'}"><i class="fas fa-check"></i><span class="ms-1">${task.isOpen ? 'Закрыть' : 'Открыть'}</span></button>
        <button type="button" class=" del-btn btn btn-danger"><i class="fas fa-times"></i><span class="ms-1">Удалить</span></button>
    </div>`
    })
    document.querySelectorAll('.del-btn').forEach((btn, btnIndex) => {
        btn.addEventListener('click', () => {
            let task = getTasks().filter((el, idx) => btnIndex !== idx)
            localStorage.setItem('tasks', JSON.stringify(task))
            view()
        })
    })

    document.querySelectorAll('.cls-btn').forEach((btn,indexBtn)=> {
        btn.addEventListener('click', ()=> {
            let task = getTasks().map((el,idx)=>  {
                if (idx === indexBtn ){
                    return  {...el, isOpen: !el.isOpen}
                }
                {
                    return el
                }
            })
            localStorage.setItem('tasks', JSON.stringify(task))
            view()
        })
    })
}

view()