const Weather = document.querySelector("div#weather");

/** 위치정보가 확인됨을 알림, successCallBack */
function onGeo_ok(postion){
    // 위도/경도 확인
    /** 위도 */ const lat = postion.coords.latitude;
    /** 경도 */ const lon = postion.coords.longitude;
    const lang = siteLangSetting;

    // 위도/경도와 API를 이용해 위치/날씨 조회
    const API_KEY = '43237d32724803230a0d45873c412ce8';
    /** Current weather data API; https://openweathermap.org/current */
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${lang}`;

    // API load, 위치/날씨 정보를 출력
    fetch(url)
        .then( response => response.json() )
        .then( data => {
            const text_weather = document.querySelector("#weather span:first-of-type");
            const text_temperature = document.querySelector("#weather span:nth-of-type(2)");
            const text_city = document.querySelector("#weather span:last-of-type");
            const icon_weather = document.querySelector("#weather i:first-of-type");
            
            const thisWeather_icon = weather_icon.filter((item) => item.type == data.weather[0].main )[0].icon;

            text_weather.innerText = data.weather[0].main;
            text_temperature.innerText = data.main.temp+'℃';
            text_city.innerText = data.name;
            icon_weather.setAttribute("class",thisWeather_icon);

            console.log(data.weather[0].main, thisWeather_icon);
            if(thisWeather_icon == undefined){
                console.log("현재 날씨의 지정된 아이콘이 없습니다");
                console.log(`현재 날씨 : ${text_weather}`);
            }
    });
};

/** 위치 정보를 받는데 실패, errorCallBack */
function onGeo_error(){
    alert("Can't find you. No weather for you.");
};

navigator.geolocation.getCurrentPosition(onGeo_ok, onGeo_error);

//** 날씨에 따른 아이콘 */ */
const weather_icon = [
    {type:'Clear',icon:'fa-solid fa-sun'},
    {type:'Cloud',icon:'fa-solid fa-cloud'},
    {type:'Rain',icon:'fa-solid fa-umbrella'},
    {type:'Snow',icon:'fa-solid fa-snowflake'},
    {type:'Mist',icon:'fa-solid fa-smog'},
    {type:'Wind',icon:'fa-solid fa-wind'}
]

