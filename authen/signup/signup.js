const url = "http://localhost:3000/signup"; 

const form = document.getElementById("signup-form");
let username = document.getElementById("username");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password"); 
let errorMessage = document.getElementById("error-message");
form.addEventListener("submit", function (event) { 
  console.log("Form submitted"); 
  event.preventDefault();   

let data = { 
    username: username.value,
    password: password.value,
} 

if (password.value === confirmPassword.value) {
    console.log(data); 
    signup(data); 
} else { 
    errorMessage.innerHTML = "Passwords do not match";
    errorMessage.style.color = "red"; 
    console.log("Passwords do not match"); 
    } 
}); 


function signup(data) {

    axios.put(url, data) 
    .then(response => {
        if (response === "added") { 
            console.log("success"); 
            window.location.href = "http://localhost:3000/home"; 
        }
    })
    .catch(error => { 
        console.log(error); 
    }); 

}
