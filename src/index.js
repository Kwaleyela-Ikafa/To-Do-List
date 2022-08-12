import './style.css';

const inputBox = document.getElementById('list-input');
const addBtn = document.getElementById('submit-new-item');
const deleteAllBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('list');

class Task {
  constructor(index, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

let listArray = [];

addBtn.addEventListener('click', () => {
  const userEnteredValue = inputBox.value;
  const getLocalStorageData = localStorage.getItem('List item');
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  listArray.push(userEnteredValue);
  localStorage.setItem('List item', JSON.stringify(listArray));
  addBtn.classList.remove('active');
});

const showTasks = () => {
  const getLocalStorageData = localStorage.getItem('List item');
  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  let newLiTag = '';
  listArray.forEach((element) => {
    newLiTag += `
            <li class = 'list-item'>
            <input id= '${Task.index}' class='checkbox' type='checkbox' ${!Task.completed ? '' : 'checked'}>
            ${element}<span class="icon"><i class="fas fa-trash"></i></span>
            </li>
            `;
  });
  todoList.innerHTML = newLiTag;
  inputBox.value = '';
};

// delete task function
const deleteTask = (index) => {
  if (index.target.classList.contains('fa-trash')) {
    const getLocalStorageData = localStorage.getItem('List item');
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);
    localStorage.setItem('List item', JSON.stringify(listArray));
    showTasks();
  }
};
todoList.addEventListener('click', deleteTask);

// delete all tasks function
deleteAllBtn.onclick = () => {
  listArray = [];
  localStorage.setItem('List item', JSON.stringify(listArray)); // set the item in localstorage
  showTasks();
};

// refresh the page
const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});

showTasks();
