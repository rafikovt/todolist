(() => {
  const createAppTitle = (title) => {
    const titleApp = document.createElement(`h2`);
    titleApp.innerHTML = title;
    return titleApp;
  };
  
  const createAppForm = () => {
    const form = document.createElement(`form`);
    const input = document.createElement(`input`);
    const button = document.createElement(`button`);
    const buttonContainer = document.createElement(`div`);

    form.classList.add(`input-group`, `mb-3`);
    input.classList.add(`form-control`);
    input.placeholder = `Введите название нового дела`;
    button.classList.add(`btn`, `btn-primary`);
    button.setAttribute(`disabled`, true);
    buttonContainer.classList.add(`input-group-append`);
    button.textContent = `Добавить новое дело`;

    buttonContainer.append(button);
    form.append(input);
    form.append(buttonContainer);
    return {
      form,
      input,
      button,
    }
  };

  const createList = () => {
    const list = document.createElement(`ul`);
    list.classList.add(`list-group`);
    return list;
  };


  
  const todoAppForm = createAppForm();
  const todoAppList = createList();
  let items = [];

  const createTodoItem = (item, name) => {
    const listElement = document.createElement(`li`);
    const buttonContainer = document.createElement(`div`);
    const doneButton = document.createElement(`button`);
    const deleteButton = document.createElement(`button`);

    listElement.classList.add(`list-group-item`, `d-flex`, `justify-content-between`, `align-items-center`);
    items.push(item);
    localStorage.setItem(name, JSON.stringify(items));   
    listElement.textContent = item.name;
    buttonContainer.classList.add(`btn-group`, `btn-group-sn`);
    doneButton.classList.add(`btn`, `btn-success`);
    doneButton.textContent = `Готово`;
    deleteButton.classList.add(`btn`, `btn-danger`);
    deleteButton.textContent = `Удалить`;

    buttonContainer.append(doneButton);
    buttonContainer.append(deleteButton);
    listElement.append(buttonContainer);
    if (item.done) {
      listElement.classList.add(`list-group-item-success`);
    }
    
    doneButton.addEventListener(`click`, () => {
      listElement.classList.toggle(`list-group-item-success`);
      items.forEach(elem => {
        if (elem.name === listElement.textContent.slice(0, -13)) {
          elem.done = !elem.done ? true : false;
          localStorage.setItem(name, JSON.stringify(items));
        }
      })
      
    });
    deleteButton.addEventListener(`click`, () => {
      if (confirm(`Вы уверены?`)) {        
        listElement.remove();
        items = items.filter(elem => {
          return elem.name !== listElement.textContent.slice(0, -13);
        })
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(items));
        
      }
    })

    todoAppList.append(listElement);
    todoAppForm.input.value = ``;

    return {
      listElement,
      deleteButton,
      doneButton,
    }
  };

  const createTodoApp = (container, title, name) => {

    let data = localStorage.getItem(name) ? JSON.parse(localStorage.getItem(name)) : [];    
    data.forEach(elem => createTodoItem(elem, name));    
    const todoAppTitle = createAppTitle(title);    
    container.append(todoAppTitle);
    container.append(todoAppForm.form);
    container.append(todoAppList); 
    todoAppForm.input.addEventListener(`input`, () => {
      if (todoAppForm.input.value.length === 0) {
        todoAppForm.button.setAttribute(`disabled`, true);
      } else {
        todoAppForm.button.removeAttribute(`disabled`, true);
      }
    })
    todoAppForm.form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      if (!todoAppForm.input.value) {
        return;
      }
      todoAppForm.button.setAttribute(`disabled`, true);
      const item = {name: todoAppForm.input.value, done: false}

      createTodoItem(item, name);
    })
  }
  window.todoApp = {
    createTodoApp,
  };
    
})();
