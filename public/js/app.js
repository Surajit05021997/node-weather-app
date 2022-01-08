// import axios from "axios";

// console.log('Client side javascript loaded');

// const getWeather = async () => {
//   const weather = await axios.get('http://localhost:3000/weather?address=patna');
//   console.log(weather);
// }

// getWeather();

const formElement = document.querySelector('form');
const inputElement = document.querySelector('input');
const loadingElement = document.querySelector('#loading');
const successMsgElement = document.querySelector("#success-msg");
const errorMsgElement = document.querySelector("#error-msg");

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchLocation = inputElement.value;
  loadingElement.textContent = 'Loading...';
  successMsgElement.textContent = '';
  errorMsgElement.textContent = '';
  fetch(`http://localhost:3000/weather?address=${searchLocation}`).then((response) => {
  response.json().then((data) => {
    loadingElement.textContent = '';
    if(data.error) {
      successMsgElement.textContent = '';
      errorMsgElement.textContent = data.error;
    } else {
      errorMsgElement.textContent = '';
      successMsgElement.innerHTML = `<b>Location:</b> ${data.location}<br><b>Weather Condition:</b> ${data.condition}`;
    }
  });
})
});