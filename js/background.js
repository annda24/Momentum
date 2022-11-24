// html
const Background = document.querySelector("div#background");

const backImg = Background.querySelector("img");
const title = Background.querySelector("span:first-of-type");
const source = Background.querySelector("span:last-of-type");

// local Storage
const KEY_TODAYIMG = "todayImg";
const savedImg = localStorage.getItem(KEY_TODAYIMG);
const parsedImg = JSON.parse(savedImg);

// API
const API_KEY = "30094323-bb1ac75fb81af894f596121b7";
const url = `https://pixabay.com/api/?key=${API_KEY}&q=cityscapes&image_type=photo&per_page=40&min_width=5000`;

/** 새로운 배경이미지를 선택 및 적용 */
function newImage(){
    fetch(url)
        .then( response => response.json() )
        .then( data => {
            // 변수 정의
            const todayBackImgNo = Math.floor(Math.random() * data.hits.length);
            const todayBackImg = data.hits[todayBackImgNo];
            
            backImg.src = todayBackImg.largeImageURL;
            backImg.alt = `today background image | ${todayBackImg.tags} / ${todayBackImg.user} / Pixabay`;
            title.innerText = todayBackImg.tags;
            source.innerText = `${todayBackImg.user} | Pixabay`;

            // 오늘자 배경이미지를 localStorage에 저장
            todayBackImg.updated = today;
            localStorage.setItem(KEY_TODAYIMG,JSON.stringify(todayBackImg));
        });        
}

/** 당일 설정된 이미지로 배경이미지를 적용 */
function loadImage(){
    backImg.src = parsedImg.largeImageURL;
    backImg.alt = `today background image | ${parsedImg.tags} / ${parsedImg.user} / Pixabay`;
    title.innerText = parsedImg.tags;
    source.innerText = `${parsedImg.user} | Pixabay`;
}

if(savedImg == null || parsedImg.updated !== today){
    newImage();
}else{
    loadImage();
}

/**************미완성 코드**************/ 
// 1. 배경이미지에 따른 폰트 색상 변경 - 작업중, colorthief가 단순js가 아닌 npm인거같음..ㅠ
/** 배경의 메인색상을 추출하여 반대색상을 폰트 색상으로 적용 */ 
function pickTheColor(){
    const colorThief = new ColorThief();
    const color = colorThief.getColor(backImg);
    console.log(color);
}
// pickTheColor();