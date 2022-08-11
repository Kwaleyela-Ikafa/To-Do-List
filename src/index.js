import '/src/style.css';

const list = [
    {
      index: 0,
      description: 'Complete Tommorows project',
      completed: false,
    },
    {
      index: 1,
      description: 'Study',
      completed: false,
    },
    {
      index: 2,
      description: 'Wash the dishes',
      completed: true,
    },
  ];
  
  const toDoList = () => {
    const List = document.getElementById('list')
    for (let i = 0; i < list.length; i += 1) {
      const li = document.createElement('li');
      li.classList = 'list-item';
      li.innerHTML = `
      <input type='checkbox'>
      <h3>${list[i].description}</h3>
      `;
      List.appendChild(li);
    }
  };
  toDoList();
