const key = 'cbe3dd267a18f6c89943b3eff94f1ed7';
let lon;
let lat;
let temperature = document.querySelector(".weather__temperature h3");
let summary = document.querySelector(".weather__description h3");
let loc = document.querySelector(".weather__location h3");
const kelvin = 273;

window.addEventListener("load", () => {
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {	
	lon = position.coords.longitude;
	lat = position.coords.latitude;

	// API URL
	const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=${key}`;

	// Calling the API
	fetch(base)
		.then((response) => {
		return response.json();
		})
		.then((data) => {		
		temperature.textContent =
			Math.floor(data.main.temp - kelvin) + "°C";
		summary.textContent = data.weather[0].description;        
		loc.textContent = data.name + "," + data.sys.country;
		});
	});
}
});
