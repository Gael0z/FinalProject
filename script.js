// store tasks
let tasks = [];

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskNameInput = document.getElementById('taskName');
const taskPrioritySelect = document.getElementById('taskPriority');
const taskImportantCheckbox = document.getElementById('taskImportant');
const taskManagerDiv = document.getElementById('taskmanager');



// Event listener for form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    

    // Create new task object
    const newTask = {
        id: Math.random(),
        name: taskNameInput.value,
        priority: taskPrioritySelect.value,
        important: taskImportantCheckbox.checked,
        completed: false,
        dateAdded: new Date()
    };

    const JsonString = JSON.stringify(newTask, null, 2);
    console.log(JsonString);


    // Add task to array
    tasks.push(newTask);
    
    // Reset form
    taskForm.reset();
    
    // Update display
    displayTasks();
    
});

// Function to display tasks
function displayTasks() {
    taskManagerDiv.innerHTML = '';
    
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        
        // Apply styles based on task properties
        if (task.important) {
            taskElement.style.color = 'red';
        }
        
        // Format date
        const formattedDate = task.dateAdded.toLocaleDateString();
        
        // Create task HTML
        taskElement.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.name} (${task.priority}) - Added: ${formattedDate}</span>
            <label>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id})"> Done
            </label>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        
        // Apply strikethrough style for completed tasks
        if (task.completed) {
            taskElement.querySelector('span').style.textDecoration = 'line-through';
        }
        
        taskManagerDiv.appendChild(taskElement);
    });
}

// Function for task completion
function toggleTaskCompletion(taskId) {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        displayTasks();
    }
}

// Function to delete task
function displayTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

// Initial display
displayTasks();