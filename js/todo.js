// html
const Todo = document.querySelector("div#todo");

const todoForm = Todo.querySelector("form#todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = Todo.querySelector("ul#todo-list");

// class name
const CLASSNAME_HOVER_OPACITY = "hoverOpacity";

// localStorage
const KEY_TODOS = "todos";
const savedTodos = localStorage.getItem(KEY_TODOS);
let todos = []; // todos_value

/** localStorage에 todo 저장 */
function saveTodos(){
    localStorage.setItem(KEY_TODOS,JSON.stringify(todos));    // stringify : 변수 등을 문자열로 바꿈
};

/** html에 todo 추가 */
function paintTodo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text;

    const btn = document.createElement("button");
    const i = document.createElement("i");
    i.setAttribute("class","fa-regular fa-square");

    btn.addEventListener('click',deleteTodo);

    li.classList.add(CLASSNAME_HOVER_OPACITY);

    btn.appendChild(i);
    li.appendChild(span);
    li.appendChild(btn);
    todoList.appendChild(li);

    todoListView();
    
    // btn_i check <-> empty
    const thisLi = todoList.querySelectorAll("li button");
    thisLi.forEach(item => 
        {
            const btn_i = item.querySelector("button i");
            item.addEventListener( 'mouseover', () => btn_i.setAttribute("class","fa-solid fa-square-check") );
            item.addEventListener( 'mouseleave',() => btn_i.setAttribute("class","fa-regular fa-square") );
        }
    );
};

/** html 및 localStorage에서 todo 삭제 */
function deleteTodo(event){
    const li = event.target.parentElement.parentElement;

    // 1. HTML에서 삭제
    li.remove();

    // 2. localStorage에서 삭제
    todos = todos.filter( (todo) => todo.id !== parseInt(li.id) );
    saveTodos();

    // 3. todos = []일때 hidden
    todoListView();
};

/** todos = []일때 hidden */ 
function todoListView(){
    if(todos.length !== 0){
        todoList.classList.remove(CLASSNAME_HIDDEN);
    }else {
        todoList.classList.add(CLASSNAME_HIDDEN);
    }
}

/** html 및 localStorage에 todo 추가 */
function handleToDoSubmit(event){
    event.preventDefault();
    
    const newTodo = todoInput.value;    // value값을 newTodo 변수에 저장
    todoInput.value = "";               // 화면의 input에서는 value 초기화/지워주기
    const newTodosObj = {
        text:newTodo,
        id:Date.now(),
    }
    todos.push(newTodosObj);

    paintTodo(newTodosObj);
    saveTodos();
};

todoListView();

todoForm.addEventListener('submit',handleToDoSubmit);

if (savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos;
    parsedTodos.forEach(paintTodo);
}