function validateRegister() {
    var username=$('#usernameReg').val();
    var password=$('#passwordReg').val();
    var firstName=$('#firstNameReg').val();
    var lastName=$('#lastNameReg').val();
    var email=$('#emailReg').val();
    var dateBirth=$('#dateReg').val();

    var allFieldsIn = false;
    var isUserNameOk = false;
    var isPasswordOk = false;
    var isFirstNameOk = false;
    var isLastNameOk = false;
    var isEmailOk = false;

    allFieldsIn = checkAllFieldsInserted(username,password,firstName,lastName,email,dateBirth)
    if(allFieldsIn){
        isUserNameOk = checkIfUserNameExist(username);
        if(!isUserNameOk){
            isPasswordOk = checkPassword(password);
            if(isPasswordOk){
                isFirstNameOk = checkNameOrLastName(firstName);
                if(isFirstNameOk){
                    isLastNameOk = checkNameOrLastName(lastName);
                    if(isLastNameOk){
                        isEmailOk = ValidateEmail(email);
                        if(isEmailOk){
                            if(allFieldsIn && !isUserNameOk && isPasswordOk && isFirstNameOk && isLastNameOk && isEmailOk){
                                users.push(username);
                                passwords.push(password);
                                alert("New user in the system")
                                $("#welcome").show();
                                $("#login").hide();
                                $("#register").hide();
                                $("#gameSettings").hide();
                                $("#gamePlay").hide();	
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    



    function checkAllFieldsInserted(username,password,firstName,lastName,email,dateBirth){
        if(username == ""){
            alert("Must enter user-name!")
            return false;
        }
        else if(password == ""){
            alert("Must enter password!")
            return false;
        }
        else if(firstName == ""){
            alert("Must enter first name!")
            return false;
        }
        else if(lastName == ""){
            alert("Must enter last name!")
            return false;
        }
        else if(email == ""){
            alert("Must enter email!")
            return false;
        }
        else if(dateBirth == ""){
            alert("Must enter date of birth!")
            return false;
        }
        else{
            return true;
        }
    }
    
    function checkIfUserNameExist(username){
        for(i = 0 ; i <users.length; i++){
            if(username == users[i]){
                alert("The user name already exist choose another user name!")
                return true;
            }
        }
        return false;
    }

    function ValidateEmail(givenMail){
       var mail =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (givenMail.match(mail)) {
            return true;
            }
            alert("You have entered an invalid email address!")
            return false;
    }

    function checkNameOrLastName(name){
        var letters = /^[a-zA-Z]+$/
        if(name.match(letters)){
            return true;
            }
        else
            {
                alert("Name and Last name must contain only letters!")
                return false;
            }
      }

    function checkPassword(password){
        if(password.length > 5){
            if(containLettersAndNumbers(password)){
                return true;
            }
            else{
                alert("password must contain numbers and letters!")
                return false;
            }
        }
        else{
            alert("password must contain at least 6 chars!")
            return false;
        }
    }

    function containLettersAndNumbers(password){ 
        var letterNumber = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/
        if(password.match(letterNumber)){
            return true;
            }
        else
            {
            return false;
            }
      }


}