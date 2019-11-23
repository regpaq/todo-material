var completeIcon = '<i class="material-icons">check</i>';
var removeIcon = '<i class="material-icons">delete</i>';
var toDoToggle = document.getElementById('todo_toggle');
var doneToggle = document.getElementById('done_toggle');
var dueDate = document.getElementById('dueDate');


// Data Object containing two data arrays for todo and done items
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{ // if there are items in local storage, use that, otherwise load with blank
  todo: [ { value: 'Get started by creating your first to-do', dateValue: '04/11/2020' } ],
  done: []
};
renderTodoList();

// Build to-do and done list from pulling data from data arrays / local storage
function renderTodoList () {
  if (!data.todo.length && !data.done.length) return; // don't do anything if nothing in the data arrays

  for (var i = 0; i < data.todo.length; i++) { // add to-do items
    var value = data.todo[i].value;
    var dateValue = data.todo[i].dateValue;
    addItemToDOM(value,dateValue);
  }

  for (var j = 0; j < data.done.length; j++) { // add done items
    var doneValue = data.done[j].value;
    var doneDateValue = data.done[j].dateValue;
    addItemToDOM(doneValue, doneDateValue, true);
  }
}

// format date inputs
function formatDate (dateEntered) {
  var dateValue = new Date(dateEntered);
  var dateFormatted = new Intl.DateTimeFormat().format(dateValue)
  return dateFormatted;
}

// Adding a new item

// clicking + button 
document.getElementById('add').addEventListener('click', function() {
  var value = document.getElementById('item').value;
  var dateValue = formatDate(document.getElementById('dueDate').value);
  if (value && dateValue) {
    addItem(value, dateValue);
  }
});
// hitting enter in todo name box
document.getElementById('item').addEventListener('keydown', function(e) {
  if (e.code === 'Enter') {
    var value = this.value;
    var dateValue = formatDate(document.getElementById('dueDate').value);
    if (value && dateValue) {    
    addItem(value, dateValue);
    }
  }
});
// hitting enter in date box
document.getElementById('dueDate').addEventListener('keydown', function(e) {
  if (e.code === 'Enter') {
    var value = document.getElementById('item').value;
    var dateValue = formatDate(this.value);    
    if (value && dateValue) {  
      addItem(value, dateValue);
      document.getElementById('item').focus();
    }    
  }
});

// Adding item to DOM, data arrays, localstorage, and clearing item field
function addItem(value, dateValue) {
    addItemToDOM(value, dateValue); // adds item to DOM
    document.getElementById('item').value = ''; // reset value of item (to-do box) to blank
    document.getElementById('dueDate').value = ''; // reset value of item (to-do box) to blank
    data.todo.push( {value, dateValue} ); // add the newly created item to data arrays
    dataObjectUpdated();  // update local storage
}
// Constructs html and adds item to DOM
function addItemToDOM(value, dateValue, done) {
    var list = (done) ? document.getElementById('completed_list_ul') : document.getElementById('todo_list_ul'); // define 'list' as the to-do list or done list if the item is completed
    var item = document.createElement('li'); // create html <li></li>

    var complete = document.createElement('button'); // create html <button></button> for complete
    complete.classList.add('complete');
    complete.innerHTML = completeIcon;
    complete.addEventListener('click', completeItem) // add event listener to complete button

    var itemDate = document.createElement('div');
    itemDate.classList.add('itemDate');
    itemDate.innerHTML = dateValue;

    var remove = document.createElement('button'); // create html <button></button> for remove
    remove.classList.add('remove');
    remove.innerHTML = removeIcon;
    remove.addEventListener('click', removeItem) // add event listener to remove button

    item.appendChild(complete); // add the complete button to li element
    item.insertAdjacentHTML('beforeend',value); // adds the todo text in li element right before the closing </li>
    item.appendChild(itemDate); // add the item's due date
    item.appendChild(remove); // add the remove button to li element
    list.insertBefore(item, list.childNodes[0]); // adds the newly constructed item to the top of the list in the DOM
}

function dataObjectUpdated() {
  localStorage.setItem('todoList', JSON.stringify(data));
}


// Removing an item

function removeItem() {
  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.firstChild.nextSibling.data;

  if (id === 'todo_list_ul') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.done.splice(data.done.indexOf(value), 1);
  }

  dataObjectUpdated();
  parent.removeChild(item);
}

// Completing an item

function completeItem() {
  var item = this.parentNode;
  var parent = item.parentNode;
  var id = parent.id;
  var value = item.firstChild.nextSibling.data;
  var dateValue = item.firstChild.nextSibling.nextSibling.innerHTML;

  if (id === 'todo_list_ul') {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.done.push( {value, dateValue} );
  } else {
    data.done.splice(data.done.indexOf(value), 1);
    data.todo.push( {value, dateValue} );
  }
  dataObjectUpdated();

  var target = (id === 'todo_list_ul') ? document.getElementById('completed_list_ul'):document.getElementById('todo_list_ul');
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}


// Due Date Field Styling - makes white 
dueDate.addEventListener('focus', function() {
  if (dueDate.value.length == 0) {
    dueDate.classList.add('full');
  }
});

dueDate.addEventListener('blur', function() {
  if (dueDate.value.length == 0) {
    dueDate.classList.remove('full');
  }
});

// Change view from todo view and done view

toDoToggle.addEventListener('click', function() {
  toggleSection();
});
doneToggle.addEventListener('click', function() {
  toggleSection();
});
function toggleSection () {
  var toDoSection = document.getElementById('todo_section');
  var doneSection = document.getElementById('done_section');
  var header = document.getElementById('header')

  if (toDoToggle.classList.contains('active')) {
    header.classList.add('done');
    toDoSection.classList.remove('visible');
    doneSection.classList.add('visible');
    toDoToggle.classList.remove('active');
    doneToggle.classList.add('active')
  } else {
    header.classList.remove('done');
    doneSection.classList.remove('visible');
    toDoSection.classList.add('visible');
    doneToggle.classList.remove('active');
    toDoToggle.classList.add('active');
  }
}