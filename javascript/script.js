// State array to manage tasks
let todos = [];

// DOM Element Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Counters DOM Elements
const countTotal = document.getElementById('count-total');
const countActive = document.getElementById('count-active');
const countCompleted = document.getElementById('count-completed');

const greetingRemaining = document.getElementById('greeting-remaining');
const greetingCompleted = document.getElementById('greeting-completed');
// Add Task Event Listener
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  
  if (text !== '') {
    addTodo(text);
    todoInput.value = '';
  }
});

// Create Task Object
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  render();
}

// Toggle Complete Status
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  render();
}

// Delete Task with Animation
function deleteTodo(id, element) {
  element.classList.add('slide-out');
  
  // Wait for animation to complete before updating state
  setTimeout(() => {
    todos = todos.filter(todo => todo.id !== id);
    render();
  }, 300);
}

// Update 3 Counters
function updateCounters() {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;

  countTotal.textContent = total;
  countActive.textContent = active;
  countCompleted.textContent = completed;

  greetingRemaining.textContent = active;
  greetingCompleted.textContent = completed;
}

// Render Todo List & Update UI
function render() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed-item' : ''}`;

      li.innerHTML = `
        <div class="todo-left">
          <div class="custom-checkbox" onclick="toggleTodo(${todo.id})">
            <i class="fa-solid fa-check"></i>
          </div>
          <span class="task-text">${escapeHTML(todo.text)}</span>
        </div>
        <button class="delete-btn" aria-label="Delete task">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      `;

      // Attach delete click handler specifically for smooth animation reference
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id, li));

      todoList.appendChild(li);
    });
  }

  updateCounters();
}

// Utility to sanitize HTML input
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Initial Render
render();