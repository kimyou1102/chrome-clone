const title = document.querySelector("#title");

const CLICKED_CLASS = "clicked";

/* 이렇게하면 마우스가 손모양된게 다시 안돌아옴
function handleClick() {
    const currentClass = title.className;
    if(currentClass !== CLICKED_CLASS) {
         title.className = CLICKED_CLASS;
    } else {
         title.className = "";
    }
}
*/

function handleClick() {
    const hasClass = title.classList.contains(CLICKED_CLASS);
    //이건 우리에게 T/F를 줄거야
    if(hasClass) {
        title.classList.remove(CLICKED_CLASS);
    } else {
        title.classList.add(CLICKED_CLASS);
       }
}

/*위와 완벽히 일치하게 작동 존내 간단함
function handleClick() {
    title.classList.toggle(CLICKED_CLASS);
}
toggle함수 안에 있는 값을 체크 만약 클래스 있으면 add 아니면 remove
라는데 설명이 반대가 아닌가? 클래스가 있으면 remove하는 거잖아 뭐고이게
*/
 function init() {
    title.addEventListener("click",handleClick);
 }
init();