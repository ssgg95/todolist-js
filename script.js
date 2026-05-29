// HTML에서 입력창 가져오기
const todoInput = document.getElementById("todoInput");

// HTML에서 추가 버튼 가져오기
const addBtn = document.getElementById("addBtn");

// HTML에서 할 일 목록(ul 또는 ol) 가져오기
const todoList = document.getElementById("todoList");


// localStorage에 저장된 todos 데이터를 가져옴
// 없으면 빈 배열([]) 사용
let todos = JSON.parse(localStorage.getItem("todos")) || [];


// todos 배열을 localStorage에 저장하는 함수
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


// 화면에 todos를 다시 그려주는 함수
function renderTodos() {

    // 기존 목록 초기화
    todoList.innerHTML = "";

    // todos 배열 반복
    todos.forEach((todo, index) => {

        // li 태그 생성
        const li = document.createElement("li");

        // span 태그 생성
        const span = document.createElement("span");

        // span 안에 할 일 텍스트 넣기
        span.textContent = todo.text;

        // 완료된 상태면 completed 클래스 추가
        if (todo.completed) {
            span.classList.add("completed");
        }

        // 버튼들을 담을 div 생성
        const btnGroup = document.createElement("div");

        // div에 클래스 추가
        btnGroup.classList.add("btn-group");


        // 완료 버튼 생성
        const completeBtn = document.createElement("button");

        // 버튼 글자 설정
        completeBtn.textContent = "완료";

        // 버튼 클래스 추가
        completeBtn.classList.add("complete-btn");

        // 완료 버튼 클릭 이벤트
        completeBtn.addEventListener("click", () => {

            // completed 값을 true/false 반전
            todos[index].completed = !todos[index].completed;

            // localStorage 저장
            saveTodos();

            // 화면 다시 렌더링
            renderTodos();
        });


        // 수정 버튼 생성
        const editBtn = document.createElement("button");

        // 버튼 글자 설정
        editBtn.textContent = "수정";

        // 클래스 추가
        editBtn.classList.add("edit-btn");

        // 수정 버튼 클릭 이벤트
        editBtn.addEventListener("click", () => {

            // prompt 창 띄워서 새 텍스트 입력받기
            const newText = prompt("수정할 내용을 입력하세요", todo.text);

            // 값이 있고 공백이 아닐 때만 수정
            if (newText && newText.trim() !== "") {

                // text 수정
                todos[index].text = newText.trim();

                // 저장
                saveTodos();

                // 다시 렌더링
                renderTodos();
            }
        });


        // 삭제 버튼 생성
        const deleteBtn = document.createElement("button");

        // 버튼 글자 설정
        deleteBtn.textContent = "삭제";

        // 클래스 추가
        deleteBtn.classList.add("delete-btn");

        // 삭제 버튼 클릭 이벤트
        deleteBtn.addEventListener("click", () => {

            // 해당 index 요소 삭제
            todos.splice(index, 1);

            // 저장
            saveTodos();

            // 다시 렌더링
            renderTodos();
        });


        // 버튼들을 div 안에 추가
        btnGroup.appendChild(completeBtn);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        // li 안에 span 추가
        li.appendChild(span);

        // li 안에 버튼 그룹 추가
        li.appendChild(btnGroup);

        // 최종적으로 ul(또는 ol)에 li 추가
        todoList.appendChild(li);
    });
}


// 새로운 할 일을 추가하는 함수
function addTodo() {

    // 입력값 가져오고 양쪽 공백 제거
    const text = todoInput.value.trim();

    // 입력값이 없으면 함수 종료
    if (!text) return;

    // todos 배열에 새 객체 추가
    todos.push({
        text: text,
        completed: false
    });

    // localStorage 저장
    saveTodos();

    // 입력창 비우기
    todoInput.value = "";

    // 화면 다시 렌더링
    renderTodos();
}


// 추가 버튼 클릭 시 addTodo 실행
addBtn.addEventListener("click", addTodo);


// 입력창에서 키 눌렀을 때 이벤트
todoInput.addEventListener("keypress", function (e) {

    // Enter 키면
    if (e.key === "Enter") {

        // 기본 동작 방지
        e.preventDefault();

        // 할 일 추가
        addTodo();
    }
});


// 페이지 처음 열릴 때 저장된 todos 출력
renderTodos();
