
// The following variable gets a reference to the #generate element.
var generateBtn = document.querySelector("#generate");

var actualString = '';

/* The Xpert Learning Assistant AI gave me the code for this function.  This determines the what the actual 
password is from the valid character types and the length that the user inputted. */
function generateCharacterString(listOfValidCharacters, passwordLength){
    
    for (var counter = 0; counter < passwordLength; counter++){
        var randomNumberBetweenZeroAndOne = Math.random();  
        var randomNumberUpToStringLength = Math.floor(randomNumberBetweenZeroAndOne * (listOfValidCharacters.length));  
        var randomCharacter = listOfValidCharacters[randomNumberUpToStringLength];
        actualString += randomCharacter;
    }

    if(passwordLength != 1){
        return actualString;
    }
}

function generatePassword(){
    
    //Here, I declare the variables for the method.
    var listOfValidCharacters = '';
    var valid = false;
    var lowercaseLetters = false;
    var uppercaseLetters = false;
    var numbers = false;
    var specialCharacters = false;
    var loopCounter = 1;
    var preliminaryCharacterGenerationCounter = 0;
    var userInput = "";
    var validCharacterSubstring = "";
    var yesOrNoSentence = "Please enter 'yes' or 'no', without quote marks."
    

    /*The program needs to figure what type of characters the user wants in the password, and how long the password should be.
    The program loops through this logic five times and asks a different question each time.*/
    while (loopCounter < 6){
        
        switch(loopCounter){
            case 1: 
                userInput = prompt("How long do you want the password to be?  Please enter a number between 8 and 128, inclusive.");
                break;
            case 2:
                userInput = prompt("Would you like to include lowercase letters in your password? " + yesOrNoSentence);
                break;
            case 3:
                userInput = prompt("Would you like to include uppercase letters in your password? " + yesOrNoSentence);
                break;
            case 4:
                userInput = prompt("Would you like to include numbers in your password? " + yesOrNoSentence);
                break;
            case 5:
                userInput= prompt("Would you like to include special characters in your password? " + yesOrNoSentence);
                break;
        } 

        valid = false;

        while(!valid){

            //If the user clicks the "Cancel" button when prompted, the script stops executing.
            if(userInput === null){
                return;
            }

            //If the answer to the first question is valid, the length of the password is logged.
            if (loopCounter === 1 && (userInput >= 8) && (userInput <= 128) && (isNaN(userInput) === false) && userInput !== ""){

                passwordLength = userInput;
                loopCounter++;
                break;

            //If the answer to the first question isn't valid, the user receives an error message and is aksed to try again.
            } else if (loopCounter === 1 && ((isNaN(userInput)) == true || userInput === "" || userInput < 8 || userInput > 128)){

                userInput = prompt("That was an invalid response.  Please enter a number between 8 and 128, inclusive.");
                continue;
            }

            /*Depending on what question the user was asked, as long as the user gives a valid answer, the program adds
            that character set to the list of valid characters.*/
            if((loopCounter > 1 && userInput.toLowerCase() === 'yes' || userInput.toLowerCase() === 'y') )  {
                

                if(loopCounter == 2){

                    validCharacterSubstring = 'abcdefghijklmnopqrstuvwxyz';
                    var lowercaseLetters = true;
                    

                } else if (loopCounter == 3){

                    validCharacterSubstring = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    var uppercaseLetters = true;

                } else if (loopCounter == 4){

                    validCharacterSubstring = '12343567890';
                    var numbers = true;

                } else if (loopCounter == 5){

                    // I took this list of special characters from https://owasp.org/www-community/password-special-characters
                    validCharacterSubstring = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
                    var specialCharacters = true;
                }

                listOfValidCharacters += validCharacterSubstring;

                /*When the user selects a new type of character to be added, one character in the password is automattically generated as that 
                type of character.  This makes sure that the password includes at least one of each of the character types the user wanted.*/
                generateCharacterString(validCharacterSubstring, 1)
                preliminaryCharacterGenerationCounter++;
            
            //Here is another error message if the user gives an invalid response to questions two through five.
            } else if ((userInput.toLowerCase() !== 'no' && userInput.toLowerCase() !== 'n') && loopCounter > 1 && loopCounter < 6){

                alert("That was an invalid response.  Please try again.");
                break;
            } 

            loopCounter++;
            valid = true;

            //If the user chooses not to have any of the four character types in the password, the system displays an error message.
            if (loopCounter == 6 && lowercaseLetters == false && uppercaseLetters == false && numbers == false && specialCharacters == false){
                alert("You must have at lease one of the four character types in your password.  Try again.");
                loopCounter = 2
                break;
            }
        }
    }

    var actualPassword = generateCharacterString(listOfValidCharacters, passwordLength - preliminaryCharacterGenerationCounter);
    document.querySelector("#password").textContent = actualPassword;
    actualString = '';
}

// The following line adds an event listener to the '#generate' button.
generateBtn.addEventListener("click", generatePassword);





