const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {//이미지넘버별로 적용하니까 이미지 넘버를 불러오는거아닐까
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);//이미지가 좀 위쪽에 있는 이유가 appendChild가 다른 애들 뒤에 있기 때문인듯하대

}

function genRandom() {
    const number = Math.floor(Math.random() * 3);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();