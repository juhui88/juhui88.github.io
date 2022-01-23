const toDoForm = document.getElementById("todo-form");
const toDoInput = document.getElementById("todo-input");
const toDoList = document.getElementById("todo-list");

toDoInput.style.background = `linear-gradient(${chosenColor1}, ${chosenColor2})`;

const TODOS_KEY = "todos";
const CHECECKTODOS_KEY = "checktodos";
const UNCHECKED_CLASSNAME = "unchecked"

let toDos = [];
let checkToDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos)); // localStorage에 문자열 형태로 넣어줌
}

function saveCheckedToDos() {
    localStorage.setItem(CHECECKTODOS_KEY, JSON.stringify(checkToDos));
}

function deleteToDo(e) {
    const li = e.target.parentElement; // 부모요소 얻기
    //const li = this.parentElement;와 같음
    
    li.remove(); // 해당 부모 요소 삭제
    toDos = toDos.filter((todo) => todo.id !== parseInt(li.id)); // 배열에서도 찾아서 삭제해줌
    // id는 문자열형태로 보이기 때문에 비교를 위해서 int로 바꿔줘야함
    checkToDos = checkToDos.filter((checktodo) => checktodo.id !== parseInt(li.id));
    saveToDos(); // 새로운 toDos로 저장
    saveCheckedToDos();
    if (toDos.length == 0) {
        toDoList.style.display = "none";
    }
}


function checkToDo(e) {
    const li = e.target.parentElement; // 부모 요소 얻기
    const checkBtn = li.children[0]; // 부모의 자식들 중 첫번째
    const span = li.children[1]; // 두번쨰
    
    if (li.className == UNCHECKED_CLASSNAME) { // li의 클래스네임 확인 체크되어있지 않은 상태였다면
        span.style.textDecoration = "line-through";
        span.style.color = chosenColor1;
        checkBtn.innerText = "🗸"; // 체크표시하고 글자밑줄, 색 바꿔줌
        li.classList.remove(UNCHECKED_CLASSNAME); // 그리고 unchecked지워줌

        var checkedTodoObj;
        for(var i = 0; i < toDos.length ; i++) {
            if (parseInt(li.id) === toDos[i].id){
                checkedTodoObj = toDos[i];
            }
        }
        
        checkToDos.push(checkedTodoObj);
        
    }else{ // 체크되어 있는 상태였다면
        span.style.textDecoration = "none";
        span.style.color = "#4e4c4c";
        checkBtn.innerText = " "; // 원 상태로 복귀
        li.classList.add(UNCHECKED_CLASSNAME); // 다시 unchecked 추가
        
        checkToDos = checkToDos.filter((checktodo) => checktodo.id !== parseInt(li.id));
        
    }
    
    saveCheckedToDos();
}


function paintToDo(newTodoObj) {
    toDoList.style.display = "";

    const li = document.createElement("li"); // li태그 생성
    const span = document.createElement("span"); // span태그 생성
    const removeBtn = document.createElement("button"); // remove button 태그 생성
    const checkBtn = document.createElement("button"); // check button 태그 생성;

    span.innerText = newTodoObj.text; // span 내에 문구를 넣음
    removeBtn.innerText = "🗑"; // button 내에 x를 넣음
    checkBtn.innerText = " ";
    
    removeBtn.style.color = chosenColor1;
    removeBtn.style.fontSize = "20px";
    checkBtn.style.fontSize = "20px"
    checkBtn.style.color = chosenColor1;
    checkBtn.style.borderColor = chosenColor1;
    checkBtn.style.borderRight = "3px solid"

    span.classList.add("li-span");
    removeBtn.classList.add(HIDDEN_CLASSNAME);
    removeBtn.classList.add("removeBtn");
    checkBtn.classList.add("checkBtn");
    li.id = newTodoObj.id; // li태그에 id부여
    
    li.appendChild(checkBtn);
    li.appendChild(span); // li로 span 감싸기
    li.appendChild(removeBtn); // li로 button 감싸기
    
    li.classList.add(UNCHECKED_CLASSNAME);
    toDoList.appendChild(li); // todoList 안에 li 넣기

    
    li.addEventListener("mouseover", function() {
        removeBtn.classList.remove(HIDDEN_CLASSNAME);
        checkBtn.innerText = "🗸";
    })
    li.addEventListener("mouseout", function() {
        removeBtn.classList.add(HIDDEN_CLASSNAME);
        if(li.className == UNCHECKED_CLASSNAME) {
            checkBtn.innerText = " ";
        }else {
            checkBtn.innerText = "🗸";
        }
    })
    removeBtn.addEventListener("click", deleteToDo); // click시 해당 목록 삭제
    checkBtn.addEventListener("click", checkToDo)
    toDoList.classList.remove(HIDDEN_CLASSNAME);
    toDoList.style.borderRadius = "5px";
    toDoList.style.borderColor = chosenColor1;

    
}

function handleToDoSubmit(e) {
    e.preventDefault(); // 새로고침 방지
    
    const newTodo = toDoInput.value; // todoInput의 value를 가져와서 저장
    
    toDoInput.value = ""; // 초기화시켜줌

    const newTodoObj = { // 각 요소들을 분리해주기 위해 id가 부여된 객체 생성
        text: newTodo,
        id: Date.now(),
    };

    toDos.push(newTodoObj); // newTodoObj를 배열에 저장
    
    paintToDo(newTodoObj); // newTodoObj를 목록에 추가함
    saveToDos();
}


toDoForm.addEventListener("submit", handleToDoSubmit); // 엔터키 누르면 함수 호출

const savedToDos = localStorage.getItem(TODOS_KEY); // localStorge에서 아이템 얻기
const savedCheckedToDos = localStorage.getItem(CHECECKTODOS_KEY);

if (savedToDos !== null) { // 비어있지 않다면
    const parsedToDos = JSON.parse(savedToDos); // 배열로 바꿔줌
    toDos = parsedToDos; // toDos배열에 parsedToDos배열을 대입
    parsedToDos.forEach(paintToDo); // 각 요소에 대해 paintToDo함수 실행

    
}

/*if (checkToDos.find(function(element) {
            if(element.id === parseInt(li.id)){
                return true;
                console.log(element.id);
            }
        }) !== true)*/