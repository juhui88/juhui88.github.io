const API_KEY = "9785dfe45ad749fc5ec1d09983fee741";

function onGeoOk(position) {
    const lat = position.coords.latitude; // 위도 얻기
    const lon = position.coords.longitude; // 경도 얻기
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url).then((response) => response.json()).then((data) => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} ${data.main.temp}°C`;
    });

}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)