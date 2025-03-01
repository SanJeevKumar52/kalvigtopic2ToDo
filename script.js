// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert('Please enter a task!');
    return;
  }

  addTask(taskText);
  saveTaskToLocalStorage(taskText);
  taskInput.value = '';
});

// Add task to the DOM
function addTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="${isCompleted ? 'completed' : ''}">${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;

  // Event Listeners
  li.querySelector('span').addEventListener('click', () => toggleCompletion(li));
  li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(li));

  taskList.appendChild(li);
}

// Toggle task completion
function toggleCompletion(li) {
  li.querySelector('span').classList.toggle('completed');
  updateLocalStorage();
}

// Delete task
function deleteTask(li) {
  li.remove();
  updateLocalStorage();
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
  let tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Update local storage
function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map(li => ({
    text: li.querySelector('span').innerText,
    completed: li.querySelector('span').classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  getTasksFromLocalStorage().forEach(task => addTask(task.text, task.completed));
}
