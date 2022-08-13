import './style.css';
import Task from './modules/task.js';

const inputBox = document.getElementById('list-input');
const addBtn = document.getElementById('submit-new-item');
const deleteAllBtn = document.getElementById('clear-btn');
const todoList = document.getElementById('list');

let listArray = [];

addBtn.addEventListener('click', () => {
  const userEnteredValue = inputBox.value;

  const getLocalStorageData = localStorage.getItem('List item');

  if (getLocalStorageData == null) {
    listArray = [];
  } else {
    listArray = JSON.parse(getLocalStorageData);
  }
  const index = listArray.length + 1;
  const task = new Task(index, userEnteredValue);

  listArray.push(task);
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
  listArray.forEach(
    (task, index) => {
      const li = document.createElement('li');

      li.innerHTML = `
            <div class = 'list-item'>
            <input id= '${task.index}' class='checkbox' type='checkbox' ${!task.completed ? '' : 'checked'}>
            <input id="${index + 1}" type='text' class=" ${!task.completed ? '' : 'checked'} taskK " value="${task.description}" />
            <span id= '${task.index}' class="icon"><i class="fas fa-trash"></i></span>
            </div>
            `;
      todoList.appendChild(li);
    },
  );

  inputBox.value = '';
};

const save = (elem) => localStorage.setItem('List item', JSON.stringify(elem));

const deleteTask = (e) => {
  if (e.target.classList.contains('fa-trash')) {
    e.target.parentElement.parentElement.parentElement.remove();
    const newTaskList = listArray.filter((elem) => +elem.index !== +e.target.parentElement.id);
    const updateTaskList = newTaskList.map((elem, index) => {
      elem.index = index + 1;
      return elem;
    });
    save(updateTaskList);
    listArray = updateTaskList;
  }
};

todoList.addEventListener('click', deleteTask);

// delete all tasks function
deleteAllBtn.onclick = (e) => {
  listArray.splice(e);
  localStorage.setItem('List item', JSON.stringify(listArray)); // set the item in localstorage
  window.location.reload();
};

// editing task function.
const editing = (e) => {
  if (e.target.type === 'text' && e.key === 'Enter') {
    const targetElem = e.target;
    listArray[targetElem.id - 1].description = e.target.value;
    listArray.filter((e) => +e.index === +targetElem.id);
    save(listArray);
    window.location.reload();
  }
};

todoList.addEventListener('keypress', editing);

// update on changing the checkbock function.
const updateChanges = (event) => {
  if (event.target.checked) {
    event.target.nextElementSibling.classList.add('checked');
    listArray[Number(event.target.id) - 1].completed = true;
    localStorage.setItem('List item', JSON.stringify(listArray));
  } else {
    event.target.nextElementSibling.classList.remove('checked');
    listArray[Number(event.target.id) - 1].completed = false;
    localStorage.setItem('List item', JSON.stringify(listArray));
  }
};

todoList.addEventListener('change', updateChanges);

// refresh the page
const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});

showTasks();
