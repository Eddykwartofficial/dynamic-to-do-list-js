// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load existing tasks from Local Storage when page loads
    loadTasks();

    // Step 5: Attach Event Listeners
    // Add event listener to addButton that calls addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add event listener to taskInput for 'keypress' event to allow Enter key task addition
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Step 3: Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create and display the new task element
        createTaskElement(taskText);

        // Save the new task to Local Storage
        saveTaskToStorage(taskText);

        // Clear the task input field
        taskInput.value = '';
    }

    // Function to create and append a task element to the DOM
    function createTaskElement(taskText) {
        // Step 4: Task Creation and Removal
        // Create a new li element and set its textContent to taskText
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Assign onclick event to remove button that removes the li element from taskList
        removeButton.onclick = () => {
            taskList.removeChild(li);
            // Remove task from Local Storage when removed from DOM
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(li);
    }
});

/**
 * Load tasks from Local Storage and display them on the page
 * This function runs when the page loads to restore previously saved tasks
 */
function loadTasks() {
    // Get stored tasks from Local Storage, defaulting to empty array if none exist
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Get reference to task list element
    const taskList = document.getElementById('task-list');

    // Clear existing list to avoid duplicates on reload
    taskList.innerHTML = '';

    // Create task elements for each stored task
    storedTasks.forEach(taskText => {
        // This is a simplified call since createTaskElement is not in this scope
        // In a real separate file scenario, you'd pass taskList or make createTaskElement global
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        removeButton.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

/**
 * Save a new task to Local Storage
 * @param {string} taskText - The task text to save
 */
function saveTaskToStorage(taskText) {
    // Get existing tasks from Local Storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Add new task to the array
    storedTasks.push(taskText);

    // Save updated array back to Local Storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

/**
 * Remove a task from Local Storage
 * @param {string} taskText - The task text to remove
 */
function removeTaskFromStorage(taskText) {
    // Get existing tasks from Local Storage
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Filter out the task to be removed
    storedTasks = storedTasks.filter(task => task !== taskText);

    // Save updated array back to Local Storage
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

/**
 * Optional utility function to clear all tasks
 * Uncomment and call this function if you need to reset the application
 */
/*
function clearAllTasks() {
    document.getElementById('task-list').innerHTML = '';
    localStorage.removeItem('tasks');
}
*/
