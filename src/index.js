/* eslint-disable*/
import './style.css';

const inputBox = document.getElementById('list-input');
const addBtn = document.getElementById('submit-new-item');
const deleteAllBtn = document.getElementById('clear-btn');
const todoList = document.getElementById("list");

class Task {
  constructor(index, description, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }
}

let listArray = []


addBtn.addEventListener('click', () => {
   let userEnteredValue = inputBox.value; //getting input field value
   let getLocalStorageData = localStorage.getItem("List item"); //getting localstorage
   if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
   }else{
     listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
   }
   listArray.push(userEnteredValue); //pushing or adding new value in array
   localStorage.setItem("List item", JSON.stringify(listArray)); //transforming js object into a json string
   showTasks(); //calling showTask function
   addBtn.classList.remove("active"); //unactive the add button once the task added 
})


const showTasks = () => {
  let getLocalStorageData = localStorage.getItem("List item");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  let newLiTag = "";
  listArray.forEach((element) => {
    newLiTag += `
            <li class = 'list-item'>
            <input id= '${Task.index}' class='checkbox' type='checkbox' ${!Task.completed ? '' : 'checked'}>
            <input id="task" type='text' class=" ${!Task.completed ? '' : 'checked'} " value="${element}" /><span class="icon"><i class="fas fa-trash"></i></span>
            </li>
            `
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
const deleteTask = (index) => {
  if (index.target.classList.contains('fa-trash')) {
  let getLocalStorageData = localStorage.getItem("List item");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("List item", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}
}
todoList.addEventListener('click', deleteTask);


// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("List item", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}

// refresh the page
const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});

// editing task function.
const editing = (event) => {
  if (event.target.type === 'text' && event.key === 'Enter') {
    const targetedElem = event.target.parentElement.parentElement;
    listArray.filter((e) => +e.index === +targetedElem.id);
    listArray[targetedElem.id - 1].element = event.target.value;
    save(listArray);
  }
};

todoList.addEventListener('keypress', editing);

// update on changing the checkbock function.
const updateChanges = (event) => {
  if (event.target.checked) {
    event.target.nextElementSibling.classList.add('checked');
    listArray[event.target.id - 1].completed = true;
    save(listArray);
    showTasks();
  } else {
    event.target.nextElementSibling.classList.remove('checked');
    listArray[event.target.id - 1].completed = false;
    save(listArray);
    showTasks();
  }
};

todoList.addEventListener('change', updateChanges);

showTasks(); 