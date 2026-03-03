// LOGIN FUNCTION

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    const res = await fetch("/login", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await res.text();

    if(data === "success"){
        window.location.href = "/dashboard.html";
    }
    else{
        alert("Invalid login");
    }

});