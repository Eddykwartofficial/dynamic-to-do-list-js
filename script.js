// Wait for DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', () => {
    // Load existing tasks from Local Storage when page loads
    loadTasks();
    
    // Get references to DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    
    // Add event listener for the Add Task button
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText, true); // true indicates to save to Local Storage
            taskInput.value = ''; // Clear the input field
        }
    });
    
    // Add event listener for Enter key press in input field
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText, true);
                taskInput.value = '';
            }
        }
    });
});

/**
 * Load tasks from Local Storage and display them on the page
 */
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents saving again to Local Storage
}

/**
 * Add a new task to the list and optionally save to Local Storage
 * @param {string} taskText - The text content of the task
 * @param {boolean} save - Whether to save the task to Local Storage (default: true)
 */
function addTask(taskText, save = true) {
    const taskList = document.getElementById('task-list');
    
    // Create the list item element
    const listItem = document.createElement('li');
    
    // Create a span to hold the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    
    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    
    // Add event listener to remove button
    removeBtn.addEventListener('click', () => {
        removeTask(listItem, taskText);
    });
    
    // Append elements to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(removeBtn);
    
    // Append the list item to the task list
    taskList.appendChild(listItem);
    
    // Save to Local Storage if requested
    if (save) {
        saveTaskToStorage(taskText);
    }
}

/**
 * Remove a task from the DOM and Local Storage
 * @param {HTMLElement} listItem - The list item element to remove
 * @param {string} taskText - The text content of the task to remove from storage
 */
function removeTask(listItem, taskText) {
    // Remove from DOM
    listItem.remove();
    
    // Remove from Local Storage
    removeTaskFromStorage(taskText);
}

/**
 * Save a new task to Local Storage
 * @param {string} taskText - The task text to save
 */
function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

/**
 * Remove a task from Local Storage
 * @param {string} taskText - The task text to remove
 */
function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    
    // Filter out the task to be removed
    storedTasks = storedTasks.filter(task => task !== taskText);
    
    // Update Local Storage with the filtered array
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

/**
 * Optional: Clear all tasks (utility function for testing)
 * Uncomment and call this function if you need to clear all tasks
 */
/*
function clearAllTasks() {
    document.getElementById('task-list').innerHTML = '';
    localStorage.removeItem('tasks');
}
*/