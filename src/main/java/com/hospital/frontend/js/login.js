alert("JS Loaded");

const form = document.getElementById("loginForm");

form.addEventListener("submit", loginUser);

async function loginUser(event) {

    event.preventDefault();

    alert("Login button clicked");

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log(username, password);

    try {

        const response = await fetch("http://localhost:8080/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: username,
                password: password
            })

        });

        alert("Response received");

        if (response.ok) {

            const token = await response.text();

            alert(token);

            localStorage.setItem("token", token);

            window.location.href = "admin.html";

        } else {

            alert("Invalid Username or Password");

        }

    } catch (error) {

        console.error(error);

        alert("ERROR: " + error);

    }

}