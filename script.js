// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); // Select the "Add Task" button
    const taskInput = document.getElementById('task-input'); // Select the input field for tasks
    const taskList = document.getElementById('task-list'); // Select the unordered list for tasks

    // Step 3: Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return; // Exit the function if no task is entered
        }

        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set the text content to the task text
        listItem.classList.add('task-item'); // Add a class to the li element for styling

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set button text
        removeButton.classList.add('remove-btn'); // Assign class name for styling

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from taskList
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';
    }

    // Step 4: Attach Event Listeners
    addButton.addEventListener('click', addTask); // Call addTask when button is clicked

    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        // Allow tasks to be added by pressing the "Enter" key
        if (event.key === 'Enter') {
            addTask(); // Call addTask when Enter is pressed
        }
    });
});
// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Step 3: Create the addTask Function
    function addTask(taskText, save = true) {
        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = '';

        // Save to Local Storage if required
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Step 4: Attach Event Listeners
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText); // Add task and save to Local Storage
    });

    taskInput.addEventListener('keypress', function(event) {
        // Allow tasks to be added by pressing the "Enter" key
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText); // Add task and save to Local Storage
        }
    }); 
});      
               