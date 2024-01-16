const container = document.querySelector('.container');
const search = document.querySelector('.search-section button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const API_KEY = '59b3d0b11e0c567ed7a1a11dd7e7ab71';
const error404 = document.querySelector('.not-found');

// Event Handler

search.addEventListener('click', () => {
    const city = document.querySelector('.search-section input').value;
    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`).then(response => response.json()).then(json => {

        if (json.code == '404') {
            container.style.height = '250px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;

        }

        container.style.height = '400px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch (json.weather[0].main) {
            case 'Clouds':
                image.src = 'assets/img/cloud.png';
                break;
            case 'Rain':
                image.src = 'assets/img/rain.png';
                break;
            case 'Mist':
                image.src = 'assets/img/mist.png';
                break;
            case 'Haze':
                image.src = 'assets/img/mist.png';
                break;
            case 'Snow':
                image.src = 'assets/img/snow.png';
                break;
            case 'Clear':
                image.src = 'assets/img/clear.png';
                break;
            default:
                image.src = 'assets/img/404.png';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>⁰C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;


        console.log(city + ' ' + json.weather[0].main);
    });

});