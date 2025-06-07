let arr = [1, 2, 3, 4];
arr.unshift(10, 20);
arr.push(30, 40);
console.log(arr);

arr = [10, 20, 30, 40, 50, 60, 70, 80];
arr.splice(2, 3);
console.log(arr);

arr = [1, 2, 3, 4, 5, 6];
arr.splice(3, 1, 100, 200);
[1, 2, 3, 100, 200, 5, 6]

let words = ["apple", "banana", "cherry"];
words.forEach(function(word) {
    console.log(word.toUpperCase());
});

let numbers = [1, 2, 3, 4, 5, 6];
numbers.forEach(function(value) {
    if (value % 2 === 0) {
console.log(value);
    } else {
      console.log(value * 2);
    }
});

numbers = [2, 4, 6, 8, 10, 12];
numbers.forEach(function(value, index) {
    const result = value + index;
    if (result % 2 === 0) {
console.log(value);
    }
});

numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(function(value) {
    return value * value;
});
console.log(squaredNumbers);

words = ["hi", "hello", "world", "js", "programming"];
let longWords = [];
words.map(function(word) {
    if (word.length >= 3) {
longWords.push(word);
    }
});
console.log(longWords);

// let todoInput=document.getElementById("todo-input")
// let addButton=document.getElementById("add-button")
// let todoListElement=document.getElementById("todo-list")

// let todoList = [];
// const addTodo = () => {
//     const todoText=todoInput.value.trim();
//     if (todoText === "") return;
//     todoList.push({
//         text: todoText,
//         completed: false });
//         renderTodoList();
//         todoInput.value = "";
// };
// const createTodoElement = (todo, index) => {
//     // <li> 要素を作成
//     const li = document.createElement("li");
//     li.classList.add("flex", "items-center", "justify-between", "mb-2", "p-2", "border", "border-gray-300");

//     // ToDoのテキストを表示
//     const text = document.createElement("span");
//     text.textContent = todo.text;
//     li.appendChild(text);

//     // 完了ボタンを作成
//     const completeButton = document.createElement("button");
//     completeButton.textContent = "Complete";
//     completeButton.classList.add(
//         "px-8", "py-4", "bg-blue-500", "text-white", "font-bold", "hover:bg-blue-700", "rounded", "w-40", "mr-2"
//     );
//     completeButton.addEventListener("click", () => {
//         todo.completed = !todo.completed;
//         text.style.textDecoration = todo.completed ? "line-through" : "none";
//     });
//     li.appendChild(completeButton);

//     // 削除ボタンを作成
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.classList.add(
//         "px-8", "py-4", "bg-red-500", "text-white", "font-bold", "hover:bg-red-700", "rounded", "w-40"
//     );
//     deleteButton.addEventListener("click", () => {
//         todoList.splice(index, 1); // ToDoリストから削除
//         renderTodoList(); // リストを再描画
//     });
//     li.appendChild(deleteButton);

//     return li;
// };

// const renderTodoList = () => {
//     // 現在のtodoListをクリアしてから再描画
//     todoListElement.innerHTML = "";
//     todoList.forEach((todo, index) => {
//         const todoElement = createTodoElement(todo, index);
//         todoListElement.appendChild(todoElement);
//     });
// };


// addButton.addEventListener("click",addTodo)
// 
let todoInput = document.getElementById("todo-input"); 
let addButton = document.getElementById("add-button");
let todoListElement = document.getElementById("todo-list");

let todoList = [];
let editIndex = null; // 編集中のTo-Doのインデックスを保存

const toggleTodo = (index) => {
  todoList[index].completed = !todoList[index].completed;
  if (todoList[index].completed) {
    Swal.fire({
      title: '完了！',
      text: 'To-Do が完了しました。',
      icon: 'success',
    });
  }
  renderTodoList();
};

const createTodoElement = (todo, index) => {
  const li = document.createElement("li");
  li.classList.add("flex", "items-center", "justify-between", "mb-2", "p-2", "border", "border-gray-300");

  const text = document.createElement("span");
  text.textContent = todo.text;
  li.appendChild(text);

  const completeButton = document.createElement("button");
  completeButton.textContent = todo.completed ? "Undo" : "Complete";
  completeButton.classList.add("px-4", "py-2", "bg-blue-500", "text-white", "font-bold", "hover:bg-blue-700", "rounded", "w-20", "mr-2");
  completeButton.addEventListener("click", () => toggleTodo(index));
  li.appendChild(completeButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("px-4", "py-2", "bg-yellow-500", "text-white", "font-bold", "hover:bg-yellow-700", "rounded", "w-20", "mr-2");
  editButton.addEventListener("click", () => editTodo(index));
  li.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("px-4", "py-2", "bg-red-500", "text-white", "font-bold", "hover:bg-red-700", "rounded", "w-20");
  deleteButton.addEventListener("click", () => deleteTodo(index));
  li.appendChild(deleteButton);

  return li;
};

const renderTodoList = () => {
  todoListElement.innerHTML = "";
  todoList.forEach((todo, index) => {
    const todoElement = createTodoElement(todo, index);
    todoListElement.appendChild(todoElement);
  });
};

const editTodo = (index) => {
  todoInput.value = todoList[index].text;
  addButton.textContent = "更新";
  editIndex = index; // 編集対象のインデックスを記録
};

const addOrEditTodo = () => {
  const todoText = todoInput.value.trim();
  if (todoText === "") return;

  if (editIndex !== null) {
    // 編集モード
    todoList[editIndex].text = todoText;
    editIndex = null;
    addButton.textContent = "追加";
  } else {
    // 追加モード
    const newTodo = { text: todoText, completed: false };
    todoList.push(newTodo);
  }

  renderTodoList();
  todoInput.value = "";
};

const deleteTodo = (index) => {
  todoList.splice(index, 1);
  renderTodoList();
};

addButton.addEventListener("click", addOrEditTodo);

