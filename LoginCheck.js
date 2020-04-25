function validateLogin(){
    var aleartMessage = "";
    var isExists = false;
    var username=$('#username').val();
    var password=$('#password').val();
    if (username ==="")
    aleartMessage = "Plaese enter a valid User-name";
    if (password ==="")
    aleartMessage = "Plaese enter a valid password";

    for (var i in users) {
        if (username === users[i]) {
            isExists = true;
            if (password === passwords[i]) {
                $("#changeLoggedUser > b").text(username);
                $("#welcome").hide();
                $("#login").hide();
                $("#register").hide();
                $("#gameSettings").show();
                $("#gamePlay").hide();	
                return;
            }
            else{
                aleartMessage = "The password is incorrect. Please try again!";
                break;
            }
        }
    }
    if (isExists === false)
    aleartMessage = "The user name doesn't exist!";
    alert(aleartMessage);
}