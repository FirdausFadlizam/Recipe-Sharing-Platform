
let outputSpan;

function handleLoginButton() {
    console.log("Button clicked");

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const url = "http://localhost:3000/login";
    const params = `?username=${username}&password=${password}`;

    const fetchObject = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        }
    };

    fetch(url + params, fetchObject)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(jsonObject => {
            if (jsonObject) {
                outputSpan.innerHTML = "Logged in successfully";
                sessionStorage.setItem('userID', jsonObject._id);
                window.location.href ='mainPage.html';
            } else {
                outputSpan.innerHTML = "Wrong username or password";
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            outputSpan.innerHTML = 'Wrong username or password';
        });
}

function start() {
    const loginButton = document.getElementById("btn_login");
    loginButton.addEventListener('click', handleLoginButton);
    outputSpan = document.getElementById("output");
}

window.onload = start;
