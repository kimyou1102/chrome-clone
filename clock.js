const clockContainer = document.querySelector(".js-clock"),
  clockTitle =clockContainer.querySelector("h1");
/*
위와 같은 뜻
const clockContainer = document.querySelector(".js-clock");
const clockTitle =clockContainer.querySelector("h1");
*/
//clockContainer의 자식의 정보를 탐색하고싶어서

function getTime() {
    const date = new Date();//여기서 date?Date?는 class 뭔말인지 모르겠으니 찾아볼것!
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}`: hours}:${
        minutes < 10 ? `0${minutes}`: minutes}:${
        seconds <10 ? `0${seconds}` : seconds
    }`;
    //innerText는 객체 안에 텍스트를 넣기 위해서야
    
}

function init() {
    getTime();
    setInterval(getTime,1000);//밀리세컨단위라 1초면 1000을 지정
}

init();



