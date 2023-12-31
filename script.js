// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

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

        // Create a "Mark as Done" button
        const markDoneButton = document.createElement('button');
        markDoneButton.className = 'mark'
        markDoneButton.textContent = 'Mark as Done';
        markDoneButton.onclick = function () {
            markTaskAsDone(listItem);
        };

        // Append the span and button to the list item
        listItem.appendChild(taskSpan);
        listItem.appendChild(markDoneButton);

        // Add the list item to the task container
        document.getElementById('taskContainer').appendChild(listItem);

        // Clear the input field
        taskInput.value = '';

        // Clear the modal input fields
        document.getElementById('taskName').value = taskText;
        document.getElementById('endDate').value = '';
        document.getElementById('taskType').value = '';
        document.getElementById('dueTime').value = '';
        document.getElementById('description').value = '';
        document.getElementById('color').value = '#f5f5f5';
    }
}

// Function to mark a task as done
function markTaskAsDone(taskItem) {
    taskItem.remove();
}

// Function to open the task details modal
function openModal() {
    document.getElementById('taskDetailsModal').style.display = 'block';
    document.getElementById('taskDetailsModal').style.padding = '1rem';

}

// Function to close the task details modal
function closeModal() {
    document.getElementById('taskDetailsModal').style.display = 'none';
}

// Function to save task details
function saveTaskDetails() {
    // Fetch task details from modal inputs
    const taskName = document.getElementById('taskName').value.trim();
    const endDate = document.getElementById('endDate').value;
    const taskType = document.getElementById('taskType').value;
    const dueTime = document.getElementById('dueTime').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;

    // Create a new span element with the updated task details
    const taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.className = 'task-details';
    const editedTaskSpan = document.createElement('span');
    editedTaskSpan.innerHTML = `${taskName}<br>
                                Submission Date: ${endDate}<br>
                                Type: ${taskType}<br>
                                Due Time: ${dueTime}<br>
                                Description: ${description}`;
    editedTaskSpan.style.cursor = 'pointer';

    editedTaskSpan.onclick = function () {
        editTask(editedTaskSpan);
    };
    taskDetailsDiv.appendChild(editedTaskSpan);

    // Create a new list item and append the edited span
    const editedTaskItem = document.createElement('div'); // Change from <li> to <div>
    editedTaskItem.appendChild(editedTaskSpan);
    editedTaskItem.style.backgroundColor = color;

    // Create a "Mark as Done" button for the edited task
    const markDoneButton = document.createElement('button');
    markDoneButton.textContent = 'Mark as Done';
    markDoneButton.onclick = function () {
        markTaskAsDone(editedTaskItem);
    };

    // Append the "Mark as Done" button to the edited task
    editedTaskItem.appendChild(markDoneButton);

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
        ;
        const endDate = existingDetails.split('Submission Date: ')[1].split('\n')[0];
        const taskType = existingDetails.split('Type: ')[1].split('\n')[0];
        const dueTime = existingDetails.split('Due Time: ')[1].split('\n')[0];
        const description = existingDetails.split('Description: ')[1];
        const color = selectedTask.style.backgroundColor;

        // Populate modal with existing details
        document.getElementById('taskName').value = selectedTaskText.split('<br>')[0];
        document.getElementById('endDate').value = endDate;
        document.getElementById('taskType').value = taskType;
        document.getElementById('dueTime').value = dueTime;
        document.getElementById('description').value = description;

        // Set the color input value to white
        document.getElementById('color').value = '#f5f5f5' || color;
    }

    openModal();
}
