const Clock = document.querySelector("h2#clock");

function getTime(){  
    const nowTime = new Date();

    const nowHours = String(nowTime.getHours()).padStart(2,"0");
    const nowMinutes = String(nowTime.getMinutes()).padStart(2,"0");
    const nowSeconds = String(nowTime.getSeconds()).padStart(2,"0");
    const timeSpans = Clock.querySelectorAll("span");

    timeSpans[0].innerText = nowHours;
    timeSpans[1].innerText = nowMinutes;
    timeSpans[2].innerText = nowSeconds;
    // Clock.innerText = `${nowHours}:${nowMinutes}:${nowSeconds}`;

    const nowHours_no = nowTime.getHours();

    if( nowMinutes == "00" && nowSeconds == "00"){
        if(nowHours_no == 6 || nowHours_no == 12 || nowHours_no == 20){
            // 6시, 12시, 20시 정각에 GREETING_COMMENT updated
            checkTime();
        }
    }
}
getTime();
// checkTime();

setInterval(getTime,1000); // 1초 마다 실행