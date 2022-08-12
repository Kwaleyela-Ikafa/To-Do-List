/* eslint-disable*/
import './style.css';

const inputBox = document.getElementById('list-input');
const addBtn = document.getElementById('submit-new-item');
const deleteAllBtn = document.getElementById('clear-btn');
const todoList = document.getElementById("list");

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
  listArray.forEach((element, index) => {
    newLiTag += `
            <li class = 'list-item'>
            <input id= 'checkbox' type='checkbox'>
            ${element}<span class="icon"><i class="fas fa-trash"></i></span>
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

const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  window.location.reload();
});

showTasks(); //calling showTask function
// let taskList = [];

// const toDoList = () => {
//   if (listInput.value === '') {
//     alert('Add a task');
//   } else {
//     // taskList = localStorage.setItem('list-item', JSON.stringify(taskList));
//     toDoList.forEach(() => {
      // const List = document.getElementById('list');
      // const li = document.createElement('li');
      // li.classList = 'list-item';
      // li.innerHTML = `
      //   <input id= 'checkbox' type='checkbox'>
      //   <h3 id='item'>${listInput.value}</h3>
      //   <span>&cross;</span>
      //   `;
      // toDoList.appendChild(li);

//       listInput.value = '';
//     // });
//   }
// };

// addButton.addEventListener('click', toDoList);

// listInput.addEventListener('keypress', () => {
//   if (Event.key === 'Enter') {
//     toDoList();
//   }
// });

// const h3 = document.getElementById('item');
// const checkbox = document.getElementById('checkbox');
// checkbox.addEventListener('click', () => {
//   h3.style.textDecoration = "line-through";
// });