const API_KEY = "aad3d51c578ac1b0e8303a44c6dd1237";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url).then((res) =>
    res.json().then((data) => {
      const weather = document.querySelector("#weather #first-child");
      const city = document.querySelector("#weather #last-child");
      const icon = document.querySelector("img");

      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

      weather.innerText = `${data.main.temp}℃`;
      city.innerText = data.name;
    })
  );
}

const currentPosition = navigator.geolocation.getCurrentPosition(onGeoSuccess);
