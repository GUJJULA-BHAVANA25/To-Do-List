let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if(text){
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updateStats
};

const updateStats = () =>{
    const completeTasks = tasks.fileter(task => task.completed).length
    const totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks )*100;
    const progressBar = document.getElementById("progresss");

    progressBar.style.widows = `${progress}%`

}

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats;
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index ) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed": ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : "" 
                }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTaskComplete(index));
        taskList.append(listItem);
    });
};
document.getElementById("submit").addEventListener("click", function (e){
    e.preventDefault();

    addTask();
});