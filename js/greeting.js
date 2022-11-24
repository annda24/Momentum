/************************** argument **************************/
const Container = document.querySelector("#Container");
const Hello = Container.querySelector("h1#hello");
const Greeting = Container.querySelector("h2#greeting");
const loginForm = Container.querySelector("#login-form");

const loginInput = loginForm.querySelector("input[type=text]");
const loginBtn = loginForm.querySelector("i");

// STRING으로만 구성된 변수들; 해당 경우에 관습적으로 변수명을 대문자로만 작성.
const CLASSNAME_HIDDEN = "hidden";  // display:none인 css className

// localStorage
const KEY_USERNAME = "username";    // localStorage의 userName key
const savedUsername = localStorage.getItem(KEY_USERNAME);

// 시간
const nowDate = new Date();
/** 년월일 코드; background.js, quote.js에서 배경이미지와 명언의 업데이트 일시를 확인하거나 비교할 때 사용합니다. */
const today = `${nowDate.getFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()}`;

let Status_logInOut = false;

// login status
if (savedUsername == null){
    /** 로그인 상태; false : log off/out; true : log on/in */
    Status_logInOut = false;
}else {
    Status_logInOut = true;
}

/************************** argument **************************/

/************************** function **************************/

/** login/off 상태에 따라 content on/off */
function logInOut(){
    const LOGIN_CLASS_NAME = "login";

    if(Status_logInOut == true){
        Container.classList.add(LOGIN_CLASS_NAME);
        checkTime();
    }else if(Status_logInOut == false){
        Container.classList.remove(LOGIN_CLASS_NAME);
    }
}

/** username 등록 */
function onLoginSubmit(event){
    event.preventDefault();

    // loginForm 역할 수행 후 숨기기
    const userName = loginInput.value;
    localStorage.setItem(KEY_USERNAME,userName);
    loginInput.value = "";

    checkTime();
    
    Status_logInOut = true;
    logInOut();
}

/** 시간에 따른 greeting ment */ 
function checkTime(){
    const nowTime = new Date();
    const nowHours = nowTime.getHours();
    const savedUsername = localStorage.getItem(KEY_USERNAME);

    if (nowHours >= 6 && nowHours <= 11){
        // 6~11시 : 오전
        GREETING_COMMENT = "Good morning"
    }else if (nowHours >= 12 && nowHours <= 19){
        // 12~19시 : 오후
        GREETING_COMMENT = "Good Afternoon"
    }else if (nowHours <= 5 || nowHours >= 20){
        // 20~5시 : 저녁/밤
        GREETING_COMMENT = "Good evening"
    }
    Greeting.innerText = `${GREETING_COMMENT}, ${savedUsername}`;
}

/************************** function **************************/

loginForm.addEventListener('submit',onLoginSubmit);
logInOut();