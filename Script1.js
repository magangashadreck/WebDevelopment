//java script,dom manipulation

let input = document.querySelector('.search-bar');
let city = document.querySelector('.city');
let date = document.querySelector('.date');
let temp = document.querySelector('#tmp');
let weather = document.querySelector('.weather');
let error = document.querySelector('#error');


date.innerHTML = dateBuilder(new Date());
const api = {
    key: 'b0f361a137075c674c40a89e43e2c2da',
    base: 'http://api.openweathermap.org/data/2.5/'
}

if (input.value === '') {
    if (navigator.geolocation) {
        const successCallback = (position) => {
            fetch(`${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`)
                .then(res => res.json())
                .then(data => {
                    city.innerHTML = `${data.name}, ${data.sys.country}`
                    temp.innerHTML = `${Math.floor(data.main.temp)}*c`
                    weather.innerHTML = data.weather[0].main
                })
        }
        const errorCallback = (error) => {
            console.log(error);
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log('Your browser does not support geolocation')
    }
}

input.addEventListener("keyup", function (event) {
    if (event.key === 'Enter') {
        const query = input.value
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(data => {
                if (input.value === '') {
                    error.classList.remove('active');
                } else {
                    error.classList.add('active')
                    city.innerHTML = `${data.name}, ${data.sys.country}`
                    date.innerHTML = dateBuilder(new Date())
                    temp.innerHTML = `${Math.floor(data.main.temp)} *c`
                    weather.innerHTML = data.weather[0].main
                }
                input.value = ""
            }).catch(error => {
                console.log(error);
            })
    }
});

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    let days = ['Sundat', 'Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday', 'Saturday']

    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}
