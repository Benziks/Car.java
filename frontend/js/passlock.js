document.querySelector('#check-password').addEventListener('click', function() {
    if (document.querySelector('#password-input').value == "bestdentistever") {
        window.location.replace("main.html");
    } else {
        document.querySelector('#incorrect-message').style.display = "block";
    }
})