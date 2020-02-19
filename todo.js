/*
What types of objects do you need?

List out nouns and verbs involved in creating TODO lists.
Decide which nouns and verbs you want/need to model.
The nouns will be your objects and the values the functions.

Write simple functions that work on a few number of well-defined objects.

Keep the responsibilities separated as best you can:

1. Representing a real-life todo list as in-memory objects
2. Manipulating those in-memory objects
3. Reading and writing from the todos.txt file
4. Displaying information to the user
5. Rather user input and taking the appropriate actions
*/

let process = require('process');
let fs = require('fs');
let readlineSync = require('readline-sync');
// var logger = fs.createWriteStream('todos.txt', { flags: 'a' });

let listContent;
let fileSelection = readlineSync.question('What file are you going to use?');
let functionSelection = readlineSync.question('What do you want to do?');
let currentList = fs.readFileSync(fileSelection, 'utf-8');
// 1. keyword functions that aim to determine what the user wants to do.

if (functionSelection === 'showlist') {
  showList(fileSelection);
}

if (functionSelection === 'appendlist') {
  appendList(fileSelection);
}

if (functionSelection === 'deletelist') {
  deleteList(fileSelection);
}

if (functionSelection === 'completetask') {
  showList(fileSelection);
  console.log('Please type down the task you wish to complete');
  console.log();
  let completedTask = readlineSync.question('Which task do you wish to complete?');
  completeTask(fileSelection, completedTask);
}

// 1. end of keyword functions.

// 2.  functions that actually do the work

// 2.1 function that shows the current list.

function showList(fileSelection) {
  listContent = fs.readFileSync(fileSelection, 'utf-8');

  let differentItems = listContent.split('\n');

  let numberOfItems = differentItems.length;

  let count = 1;

  for (let i = 0; i < numberOfItems - 1; i++) {
    console.log(`${count}. ${differentItems[i]}`);
    count++;
  }
}

// 2.2 function that allows the user to append whatever he types in the question 'What do you want to add to the list?'

function appendList(fileName) {
  let appendedElement = readlineSync.question('What do you want to add to the list?');
  fs.writeFileSync(fileSelection, `[ ] ${appendedElement}\r\n ${currentList} `);

  let listContent = fs.readFileSync(fileName, 'utf-8');
  // listContent = listContent + appendedElement + '\n';

  let differentItems = listContent.split('\n');

  let numberOfItems = differentItems.length;

  let count = 1;

  for (let i = 0; i < numberOfItems - 1; i++) {
    console.log(`${count}. ${differentItems[i]}`);
    count++;
  }
}

// this is the function that allows the user to delete a specific thing they had in the list)

function deleteList(fileName) {
  listContent = fs.readFileSync(fileName, 'utf-8');
  showList(fileName);
  let deletedElement = readlineSync.question('What do you want to delete from the list?');
  // if (listContent.includes(deletedElement)) {
  // console.log('Whats up');
  let updatedListContent = listContent.replace(`[ ] ${deletedElement}\r\n`, '');

  fs.writeFileSync(fileName, updatedListContent);

  let differentItems = updatedListContent.split('\n');

  let numberOfItems = differentItems.length;

  let count = 1;

  for (let i = 0; i < numberOfItems - 1; i++) {
    console.log(`${count}. ${differentItems[i]}`);
    count++;
  }
}

// 2.3 function that allows the user to complete a task.

function completeTask(fileName, completedTask) {
  let listContent = fs.readFileSync(fileName, 'utf-8');
  listContent = listContent.replace(`[ ] ${completedTask}`, '[X] ' + completedTask);
  fs.writeFileSync(fileName, listContent);
  listContent = fs.readFileSync(fileName, 'utf-8');
  let differentItems = listContent.split('\n');
  let numberOfItems = differentItems.length;
  let count = 1;
  for (let i = 0; i < numberOfItems - 1; i++) {
  // let number = i + 1;
    if (listContent.includes(completedTask)) {
      console.log(`${count}. ${differentItems[i]}`);
      count++;
    } else {
      console.log(`${count}. ${differentItems[i]}`);
      count++;
    }
  }
}

// 2. end of functions that do the work.
