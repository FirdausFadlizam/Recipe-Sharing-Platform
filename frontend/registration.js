let outputSpan;
function handleRegButton() {

    const fName = document.querySelector("#fname").value;
    const lName = document.querySelector("#lname").value;
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    const url = "http://localhost:3000/user";

    const dataObject = {
        fName: fName,
        lName: lName,
        username: username,
        password: password
    }

    const fetchObject = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dataObject)
    };

    fetch(url, fetchObject)
    .then(response => response.json())
    .then(jsonObject => {
        outputSpan.innerHTML = `Account created for ${fName} ${lName}`;
    })
}

function start() {
    const regButton = document.getElementById("btn_reg");
    regButton.addEventListener('click', handleRegButton);
    outputSpan = document.getElementById("output");
}

window.onload = start;
