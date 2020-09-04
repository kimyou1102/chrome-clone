const toDoForm=document.querySelector(".js-toDoForm"),
    toDoInput=toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-doDoList");

const TODOS_LS = "toDos"; //이건 왜 만든거지?.? 그냥 저렇게 하는거보다 따로 변수로 지정하는게 더 깔끔해서 그런가?몰라

let toDos = [];//해야할 일을 하나만 저장하는 게 아니라, 여러개가 모인 목록으로 저장해야 하는거니까 array
//이array는 object가 있고 그 object는 숫자로 된 id가 있어

function deleteToDo(event) {
    //console.log(event.target.parentNode); 확인용 여기서 parentNode는 father
    const btn = event.target;
    const li =  btn.parentNode; //지워야할 li
    toDoList.removeChild(li);
    /*이filter는 마치 forEach에서 함수를 실행하는것 같이 각각의 아이템과 같이 실행될거
    그래서 이filter가 하는 것은 array를 하나 만들거야
    함수가 true를 return하는 아이템들이 있는
    */
    const cleanToDos = toDos.filter(function(toDo) {  //@@@@@@@@괄호안에 들어간 toDo의 뜻 정확히 이해하게 생각@@@@@@@@@@@@@
        return toDo.id !== parseInt(li.id); //li.id가 스트링인듯 그래서 앞에 parseInt붙여서 숫자로 바꿔줌 //li에 없는 id인 toDos를 체크하고 싶어 지우고싶은것이기때문(뭔말?)
    });//filter는 함수를 하나 실행시킬거야
    //array안에 있는 모든 toDos를 통할거 그리고 이것은 여기서 true인 것들인 toDos만 return할거야
    //filter는 array의 모든 아이템을 통해 함수를 실행 그리고 true인 아이템들만 가지고 새로운 array를 만들고
    //filter와cleanToDos가 하는 것은 filterFn이 체크가 된 아이템들의 array를 주는 것
    toDos = cleanToDos; //cleanToDos는 새로운것이기 때문인데 const라서 이래 코딩못함->let으로 바꾸자!
    saveToDos(); //먼저 저거 윗줄로 변화를 주고 저장하는것
}

function saveToDos() { //여기 toDos를 가져와서 로컬에 저장하는 일을 담당
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    /*JSON.stringify는 자바스크립트 object를 string으로 바꿔줌
    JSON이 데이터를 전달할 때, 자바스크립트가 그걸 다룰 수있도록 object로 바꿔주는 기능인셈
    자바스크립트의 object를 string으로 변환해주기도 하고, string을 object로 변환해줄수도 있지!
    */
}

function paintToDo(text) {
    const li = document.createElement("li");//전에 본적없던것~.~ HTML거를 가져오는거 말고 생성
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1; //+1은 왜하는..?
    delBtn.innerText = "❌"; 
    delBtn.addEventListener("click",deleteToDo);
    span.innerText = text; //이text는 submit function에서 온 값이고..
    li.appendChild(delBtn);//delBtn을 어펜드 하고싶대 어펜드요??? delBtn를 li태그 안에 삽입하는거인듯?
    li.appendChild(span);//뭔가를 그의 father element안에 넣는것이다.(뭔말?)
    //span을 li안에 넣고, 버튼을 li안에 넣어
    li.id = newId;
    toDoList.appendChild(li);
    //해야할 일을 생성할 때마다 'toDos'라는 array에 추가되도록 할 거야
    const toDoObj = { //local storage에도 투두를 저장해둬야 하기 때문
        text: text,
        id: newId
    };
    toDos.push(toDoObj);//toDos어레이 안에 넣는다(push)toDoObj라는 거를!!
    saveToDos(); //push한 후에 호출해야함 안그러면 아무일도 발생x toDos는 빈상태니 저장할게 아무것도 없음
}

function handlesubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";//submit같당.
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
     /*loadedToDos === null면 난 아무것도 하지 않을 거야 왜냐면 
     이form은 항상 showing일거거든. 그래서 사실 할게 없어(뭔말?)
     ->(loadedToDos === null)가 쓸모없다는 말 그래서 (loadedToDos !== null)로 수정한것 */
    if(loadedToDos !== null) {
        //console.log(loadedToDos); 근데 string이 아니라서 JSON을 사용할거
        const parsedToDos = JSON.parse(loadedToDos); 
        parsedToDos.forEach(function(toDo) { //forEach는 array를 위한 함수! 변수parsedToDos에 배열로저장된것을 나열하기위한
            paintToDo(toDo.text);
        });
        /*forEach는 기본적으로 함수를 실행하는데,
        array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜 주는거야
        */
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit",handlesubmit);
}

init();