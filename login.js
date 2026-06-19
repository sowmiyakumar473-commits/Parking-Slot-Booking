async function login() {

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const response = await fetch(
        "http://localhost:5000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    alert(result.message);

    if (result.message === "Login Successful") {
        localStorage.setItem(
            "user",
            JSON.stringify(result.user)
        );

        window.location.href = "booking.html";
    }
}