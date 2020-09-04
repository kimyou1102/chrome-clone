const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    gretting = document.querySelector(".js-grettings");
/*여러방법 있는데, 하나는 쿼리 셀렉터: 원하는 셀렉터 다 가져옴
클래스 css방식으로 다른 하나는 쿼리 셀렉터 올!
쿼리 셀렉터는 찾은 첫번째 것을 가져옴 but 쿼리 셀렉터올은
클래스명에 따른 엘리먼트들을 가져옴, 이건 array를 준다. 찾은게 유일하게 하나의 클래스명이라 해도 array 안에 넣을 것=니코는 귀찮아서 이방식 안씀
또 다른 방법은 getElementById
*/

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) { //
    event.preventDefault(); //이벤트 디폴트를 막았다!!
    // input.placeholder = "What is your favorite song?"; //placeholder값을 바꿀수있다. 라고했는데 안바뀌는데?
    const currentnputValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}
/*  이 함수는 내가 전에 만들어둔 event와 같이 실행 될 거야
    evnet의 preventDefault라는 것  보통 event가 발생하면 root에서 일어나고 form에서 일어나지
    이 event는 마치 일종의 거품 같은 거야 이게 올라가면서 다른 모든 것들이 event에 반응하게 되거든
    form을 제출하는 event가 발생하면 event가 계속 위로 올라가, document까지 
    그리고 그document는 다른 곳으로 갈거야 왜냐하면 이벤트는 이렇게하는게 기본동작 이니까?(아마)
    근데 나는 이 이벤트의 기본 동낙(기본값)을 막고 싶어 
    */

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text) {//이건 한개의 arrgument를 갖는데 text라고 함
    form.classList.remove(SHOWING_CN);//만약 텍스트를 칠할거라면 폼을 숨겨야해
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello ${text}`;
}

function loadName() {  //이름을 불러오도록 하는것->저장하는게 필요!
    const currentUser = localStorage.getItem(USER_LS); //괄호안에 넣는 이유는 변수가 "currentUser"를 지정하고 있으니까
    //이건 나에게 값을 줄거래
    if(currentUser === null) {    
        askForName();//currentUser가 없으면 user의 이름을 요청하는 함수
    } else {
        paintGreeting(currentUser);//paintGreeting함수를 부른다. 로컬 스토리지에서 가져온 텍스트와 함께
    }
}

function init() {
    loadName();
}

init();