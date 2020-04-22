function confirmLogin(){
    var alertMessage = "";
    var exist = false;
    var username=$('#username').val();
    var password=$('#password').val();
    if (username ==="")
        alertMessage = "Plaese enter a valid username";
    if (password ==="")
        alertMessage = "Plaese enter a valid password";

    for (var i in users) {
        if (username === users[i]) {
            exist = true;
            if (password === passwords[i]) {
                $("#loggedInUser > b").text(username);
                $('#username').val('')
                $('#password').val('')
                toggle("gameSettings");
                return;
            }
            else{
                alertMessage = "The password is incorrect. Please try again!";
                break;
            }
        }
    }
    if (exist === false)
        alertMessage = "The user name doesn't exist!";
    alert(alertMessage);
}