const weather = document.querySelector(".js-weather");

const API_KEY = "eab7d276f6ee2377d2ed0e3e38096e00";
const COORDS = 'coords';

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json() 
    }).then(function(json){
        //기다리는 중이라 떠서 then하나 더 사용해줌
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}℃  in ${place}`;
    })
       
    }
    //콘솔에 네트워크 정보만 떠서 리스판스에 json데이터 가져오고 싶음
    //then은 데이터가 우리한테 넘어 왔을때 함수호출 왜냐 데이터가 들어오는데 시간이 좀 걸리는 경우도 있기에
//then사용하는데 fetch가 완료되는걸 기다려야 하기 때문에 then사용안하고 그냥 막 하면 fetch가 정상적으로 완료되지 않을 수 있음!!
//@@@따옴표말고 ``사용!!!!!

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    /*팁: 객체의 변수의 이름과 객체의 key의 이름을 같게 저장할 때는
    const coordsObj = {   
        latitude,
        longitude
    };
        이렇게도 가능!
    */
   saveCoords(coordsObj);
   getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('Cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);//getCurrentPosition() 요청사항이 두개 하나는 좌표를 가져오는데 성공했을시 처리하는 함수
//geolocation은 객체
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    }else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();