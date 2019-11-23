////////////////////////////////////////////////////////
///////                                            Icons
////////////////////////////////////////////////////////

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

////////////////////////////////////////////////////////
///////                        Array that holds all data
////////////////////////////////////////////////////////

var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : { // checks localStorage to see if data exists. If it does, it populates our array of data
  todo: [],
  completed: []
};
renderTodoList();

////////////////////////////////////////////////////////
///////             Clicking on the '+' button in header
////////////////////////////////////////////////////////

document.getElementById('add').addEventListener('click', function() { // creates an event to watch the '+' button for clicks
  var value = document.getElementById('item').value; // getting the value of the input field ('item' element)
  if (value) {
    addItem(value);
  }
});

////////////////////////////////////////////////////////
///////                Typing 'enter' in the input field
////////////////////////////////////////////////////////

document.getElementById('item').addEventListener('keydown', function(e) { // adds listening event to input field. Looking for keys
  var value = this.value; // no idea
  if (e.code === 'Enter' && value) { // if user hits 'Enter' key and value is not blank (text in input field)
    addItem(value); // uses the 'addItem' function to add the item to the todo list
  }
});

////////////////////////////////////////////////////////
///////                Add item
////////////////////////////////////////////////////////

function addItem(value) {
    addItemToDOM(value); // executing the function 'addItemToDOM' if 'value' is true. values are auto false if empty. In other words, it only executes when there is text in the field
    document.getElementById('item').value = ''; // reseting the value back to the placeholder text once function completes

    data.todo.push(value); // adds the item to the 'todo' array
    dataObjectUpdated();
};

////////////////////////////////////////////////////////
///////                 Pulls in data from local storage
////////////////////////////////////////////////////////

function renderTodoList() {
  if (!data.todo.length && !data.completed.length) return; // if both the 'todo' and 'completed' arrays are empty, do nothing (return)

  for (var i = 0; i < data.todo.length; i++ ) { // if neither 'todo' nor 'completed' are empty, run through the 'todo' array and...
    var value = data.todo[i];
    addItemToDOM(value); // add the item to the todo list
  }

  for (var j = 0; j < data.completed.length; j++ ) { // run through the 'completed' array and...
    var value = data.completed[j];
    addItemToDOM(value, true); // add the item to the completed list. The 'true' refers back to the 'addItemToDOM' function's if statement. If the item has an id of 'completed'
  }

}

////////////////////////////////////////////////////////
///////                   Adds all data to local storage
////////////////////////////////////////////////////////

function dataObjectUpdated() { // we named this function 'dataObjectUpdated'
  localStorage.setItem('todoList', JSON.stringify(data)); // converts JS to JSON (plain text), because localStorage can't store JS
}

////////////////////////////////////////////////////////
///////       Clicking on the 'trashcan' icon on an item
////////////////////////////////////////////////////////

function removeItem() { // removing items when clicking the trash can icon
  var item = this.parentNode.parentNode; // selecting the parent's parent element of the trashcan button div
  var parent = item.parentNode; // selecting one more parent above the element we want to delete in order to use the removeChild function
  var id = parent.id;
  var value = item.innerText;

  if (id === 'todo') { // if the current item is a todo, it will...
    data.todo.splice(data.todo.indexOf(value), 1); // remove the item from the 'todo' array. 'indexOf(value)' is searching the array for an item by it's name (or content). the '1' is saying only delete one item from the array.
  } else { // if the current item is not a todo (so clicking the complete button while in the completed todo list), it will...
    data.completed.splice(data.completed.indexOf(value), 1); // remove the item from the 'completed' array.
  }
  dataObjectUpdated();

  parent.removeChild(item); // removing the child element which is the entire item
}

////////////////////////////////////////////////////////
///////       Clicking on the 'complete' icon on an item
////////////////////////////////////////////////////////

function completeItem() { // moving items to the completed list when clicking the completed icon
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  var id = parent.id
  var value = item.innerText;

  if (id === 'todo') { // if the current item is a todo, it will...
    data.todo.splice(data.todo.indexOf(value), 1); // remove the item from the 'todo' array. 'indexOf(value)' is searching the array for an item by it's name (or content). the '1' is saying only delete one item from the array.
    data.completed.push(value); // add the item to the 'completed' array
  } else { // if the current item is not a todo (so clicking the complete button while in the completed todo list), it will...
    data.completed.splice(data.completed.indexOf(value), 1); // remove the item from the 'completed' array.
    data.todo.push(value); // add the item back to the 'todo' array
  }
  dataObjectUpdated();

  //Check if the item should be added to the completed list or to re-added to the to do list
  var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  parent.removeChild(item); // removing the child element which is the entire item
  target.insertBefore(item, target.childNodes[0]);
}

////////////////////////////////////////////////////////
///////       Creating the HTML of a new item in the DOM
////////////////////////////////////////////////////////

function addItemToDOM(text, completed) {
  var list = (completed) ? document.getElementById('completed') : document.getElementById('todo'); // calling the div element with the id of 'todo' or 'completed' and setting it in a variable

  var item = document.createElement('li'); // creating an 'li' element and setting it in a variable
  item.innerText = text; // taking the inputted text value and putting it into the 'li' element ('item' variable)

  var buttons = document.createElement('div'); //creating a 'div' element and setting it in a variable
  buttons.classList.add('buttons'); // adding the class 'buttons' to this 'div'. This is the container of the two action buttons

  var remove = document.createElement('button'); // creating the remove 'button' element and setting it in a variable
  remove.classList.add('remove'); // adding the class 'remove' to the element
  remove.innerHTML = removeSVG; // inserting the trashcan SVG using its variable 'removeSVG'

  // Add click event for removing an item
  remove.addEventListener('click', removeItem)

  var complete = document.createElement('button'); // creating the completed 'button' element and setting it in a variable
  complete.classList.add('add'); // adding the class 'add' to the element
  complete.innerHTML = completeSVG; // inserting the check mark SVG using its variable 'completeSVG'

  //Add click event for completing an item
  complete.addEventListener('click', completeItem)

  buttons.appendChild(remove); // I think this is actually adding the items
  buttons.appendChild(complete);
  item.appendChild(buttons);

  list.insertBefore(item, list.childNodes[0]); // adding new items to the top of the todo list instead of the bottom
}
