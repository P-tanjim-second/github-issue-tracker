const signIn = document.querySelector("#sign-in");

signIn.addEventListener("click", (e)=> {
    // e.preventDefault() na deo ay page auto reload hocchilo condition check er agei. ajonno kaj kortesilo na 
    e.preventDefault();
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    if (name.trim() === "admin" && pass.trim() === "admin123") {
        // assign korar somoy "./" deoa jabe na
        window.location.assign('dashboard.html');
        // alert deo ay page wait kortesilo and ai somoy condition check hoye jacchilo
        alert("You'r logged in");
        return
    }
    else if(name.trim() === "" || pass.trim() === ""){
        return
    }
    alert("your username or password is incorrect")
});