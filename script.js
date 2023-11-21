// JavaScript Document
// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Declare a variable to store the initial task name
let initialTaskName = '';

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        // Create a new list item
        const listItem = document.createElement('div'); // Change from <li> to <div>
        listItem.className = 'task-item'; // Add a class for styling
        
        // Create a new span element with the task text
        const taskSpan = document.createElement('span');
        taskSpan.innerHTML = `${taskText}`;
        taskSpan.style.cursor = 'pointer';
        taskSpan.onclick = function () {
            editTask(taskSpan);
        };

        // Append the span to the list item
        listItem.appendChild(taskSpan);

        // Add the list item to the task container
        document.getElementById('taskContainer').appendChild(listItem);

        // Apply styling to the task item
		
        listItem.style.backgroundColor = '#ffffff'; // Set the background color as needed
        listItem.style.padding = '10px'; // Adjust padding as needed

        // Clear the input field
        taskInput.value = '';

        // Clear the modal input fields
        document.getElementById('taskName').value = taskText;
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('taskType').value = '';
        document.getElementById('dueTime').value = '';
        document.getElementById('description').value = '';
        document.getElementById('color').value = '#33ffff';
    }
}

// Function to open the task details modal
function openModal() {
    document.getElementById('taskDetailsModal').style.display = 'block';
}

// Function to close the task details modal
function closeModal() {
    document.getElementById('taskDetailsModal').style.display = 'none';
}

// Function to save task details
function saveTaskDetails() {
    // Fetch task details from modal inputs
    const taskName = document.getElementById('taskName').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const taskType = document.getElementById('taskType').value;
    const dueTime = document.getElementById('dueTime').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;
 
    // Create a new span element with the updated task details
    const editedTaskSpan = document.createElement('span');
    editedTaskSpan.innerHTML = `${taskName}<br>
                                Start Date: ${startDate}<br>
                                End Date: ${endDate}<br>
                                Type: ${taskType}<br>
                                Due Time: ${dueTime}<br>
                                Description: ${description}`;
    editedTaskSpan.style.cursor = 'pointer';
    editedTaskSpan.onclick = function () {
        editTask(editedTaskSpan);
    };
 
    // Create a new list item and append the edited span
    const editedTaskItem = document.createElement('div'); // Change from <li> to <div>
    editedTaskItem.appendChild(editedTaskSpan);
    editedTaskItem.style.backgroundColor = color;
 
    // Replace the selected task with the edited task
    selectedTask.parentNode.replaceChild(editedTaskItem, selectedTask);
 
    // Apply fade-in animation to the edited task details
    editedTaskItem.classList.add('fade-in');
 
    closeModal();
}
// Variable to store the selected task
let selectedTask = null;
let selectedTaskText = '';

// Function to edit a task
function editTask(taskElement) {
    selectedTask = taskElement.parentNode; // Get the parent <div> element
    selectedTaskText = taskElement.innerText.trim();

    // Extract existing details from the task text (if any)
    const existingDetails = selectedTaskText.split('Start Date: ')[1];
    if (existingDetails) {
        const startDate = existingDetails.split('\n')[0];
        const endDate = existingDetails.split('End Date: ')[1].split('\n')[0];
        const taskType = existingDetails.split('Type: ')[1].split('\n')[0];
        const dueTime = existingDetails.split('Due Time: ')[1].split('\n')[0];
        const description = existingDetails.split('Description: ')[1];
        const color = selectedTask.style.backgroundColor;

        // Populate modal with existing details
        document.getElementById('taskName').value = selectedTaskText.split('<br>')[0];
        document.getElementById('startDate').value = startDate;
        document.getElementById('endDate').value = endDate;
        document.getElementById('taskType').value = taskType;
        document.getElementById('dueTime').value = dueTime;
        document.getElementById('description').value = description;
        
        // Set the color input value to white
        document.getElementById('color').value = '#33ffff' || color ;
    }

    openModal();
}