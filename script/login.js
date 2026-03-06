const signIn = document.querySelector("#sign-in");

signIn.addEventListener("click", ()=> {
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    if (name === "admin" && pass === "admin123") {
        window.location.assign('./dashboard.html');
        console.log("work")
        return
    }
    else if(name.trim() === "" || pass.trim() === ""){
        return
    }
    
    
    alert("your username or password is incorrect")
});