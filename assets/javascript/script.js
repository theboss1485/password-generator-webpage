// Assignment code here




// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// The Xpert Learning Assistant AI helped me write this function.
function generateCharacterString(listOfValidCharacters, passwordLength){
    var actualString = '';
    for (var counter = 0; counter < passwordLength; counter++){
        var randomNumberBetweenZeroAndOne = Math.random();
        var randomNumberUpToStringLengthMinusOne = Math.floor(randomNumberBetweenZeroAndOne * (listOfValidCharacters.length - 1));
        var randomCharacter = listOfValidCharacters[randomNumberUpToStringLengthMinusOne];
        actualString += randomCharacter;
    }

    return actualString;
}

function generatePassword(){
    var listOfValidCharacters = '';
    var valid = false;
    var lowercaseLetters = false;
    var uppercaseLetters = false;
    var numbers = false;
    var specialCharacters = false;
    var loopCounter = 1;
    var userInput = "";

    var yesOrNoSentence = "Please enter 'yes' or 'no', without quote marks."
    while (loopCounter < 6){
        
        switch(loopCounter){
            case 1: 
                userInput = prompt("How long do you want the password to be?  Please enter a number between 8 and 128, inclusive.");
                break;
            case 2:
                userInput = prompt("Would you like to include lowercase letters in your password? " + yesOrNoSentence);
                break;
            case 3:
                userInput = prompt("Would you like to include uppercase lettersin your password? " + yesOrNoSentence);
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

            if(userInput === null){
                return;
            }

            if (loopCounter === 1 && (userInput >= 8) && (userInput <= 128) && (isNaN(userInput) === false) && userInput !== ""){

                passwordLength = userInput;
                loopCounter++;
                break;

            } else if (loopCounter === 1 && ((isNaN(userInput)) == true || userInput === "" || userInput.IsuserInput < 8 || userInput > 128)){

                userInput = prompt("That was an invalid response.  Please enter a number between 8 and 128, inclusive.");
                continue;
            }

            if((loopCounter > 1 && userInput.toLowerCase() === 'yes' || userInput.toLowerCase() === 'y') )  {
                

                if(loopCounter == 2){

                    listOfValidCharacters += 'abcdefghijklmnopqrstuvwxyz';
                    var lowercaseLetters = true;
                    

                } else if (loopCounter == 3){

                    listOfValidCharacters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    var uppercaseLetters = true;

                } else if (loopCounter == 4){

                    listOfValidCharacters += '12343567890';
                    var numbers = true;

                } else if (loopCounter == 5){

                    // I took this list of special characters from https://owasp.org/www-community/password-special-characters
                    listOfValidCharacters += ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~"';
                    var specialCharacters = true;
                }

                valid = true;
            } else if ((userInput.toLowerCase() !== 'no' && userInput.toLowerCase() !== 'n') && loopCounter > 1 && loopCounter < 6){

                alert("That was an invalid response.  Please try again.");
                break;
            } 

            loopCounter++;
            valid = true;

            if (loopCounter == 6 && lowercaseLetters == false && uppercaseLetters == false && numbers == false && specialCharacters == false){
                alert("You must have at lease one of the four character types in your password.  Try again.");
                loopCounter = 2
                break;
            }
        }
    }

    var actualPassword = generateCharacterString(listOfValidCharacters, passwordLength);
    var passwordText = document.querySelector("#password").textContent = actualPassword;
}

// Add event listener to generate button
generateBtn.addEventListener("click", generatePassword);




