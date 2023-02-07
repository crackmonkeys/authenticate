const url = "http://localhost:3000/login";

const form = document.getElementById("login-form");
let username = document.getElementById("username");
let password = document.getElementById("password");
let error = document.getElementById("error-message"); 


form.addEventListener("submit", function (event) {
  console.log("Form submitted"); 
  event.preventDefault();

let data = {
  username: username.value,
  password: password.value
      };  
  



axios.post(url, data)
  .then(response => { 
    if (response.data === "found") {
      console.log("success"); 
      sessionStorage.setItem("username", username.value); 
      window.location.href = "/authen/landingpage/landingpage.html";
        }
      else {
        error.innerHTML += "Invalid username or password"; 
        error.style.color = "red";
       }
      })
  .catch(error => {
      console.log(error);
      });


    }); 


