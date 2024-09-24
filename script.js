// JavaScript source code

const inputEquation = document.getElementById("input-equation");
const result = document.getElementById("result");

const backspaceBtn = document.getElementById("backspace-btn");
const clearBtn = document.getElementById("clear-btn");
const numberBtns = document.querySelectorAll(".number-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const equalsBtn = document.getElementById("equals-btn");

//answer will hold the final result of the evaluated equation
let answer = 0;

//Array of arithmetic operators
const operators = ["+", "-", "&#215;", "&#247;"];

const evaluateEquation = ((equation) => {
    //encodedStr will replace the unicode HTML codes for the multiplication and division signs,
    //to string hex codes that will be used to distinguish the multiplication and division
    //signs in the equation.
    //multiplication hex code = "&#215;"
    //division hex code = "&#247;"
    //Then a regex will be used to split the equation into an array, split at every operator
    //in the equation.
    const encodedStr = equation.replace(/[\u00A0-\u9999<>\&]/g, i => '&#' + i.charCodeAt(0) + ';');
    const operatorRegex = /(\+|\-|&#215;|&#247;)/ig;
    const equationArr = encodedStr.split(operatorRegex);

    //Calculation will store the current operation being evaluated
    //updatedEquation will store an updated array of the original equation were the
    //multiplication and division operations have already been evaluated
    let calculation = 0;
    let updatedEquation = [];

    if (operators.includes(equationArr[equationArr.length - 2])) {
        alert("Invalid Format: Equation can not end with an operator");
        return;
    }


    //The equation will be updated so multiplication and division are evaluated first 
    //and the updatedEquation variable will now only have 
    //addition and subtraction operations if any
    for (let i = 0; i < equationArr.length; i++) {
        //evaluate multiplication operations
        if (equationArr[i] === "&#215;") {
            calculation = updatedEquation[updatedEquation.length - 1] * equationArr[i + 1];
            updatedEquation.splice(updatedEquation.length - 1, 1, calculation);
            i++;
        }
        //evaluate division operations
        else if (equationArr[i] === "&#247;") {
            calculation = equationArr[i - 1] / equationArr[i + 1];
            updatedEquation.splice(updatedEquation.length - 1, 1, calculation);
            i++;
        } else {
            updatedEquation.push(equationArr[i]);
        }
    }

    //answer will be set to the first number value in the updated Equation
    //if the original equation only had multiplication and/or division operations
    //then updateEquation[0] will have the final evaluated result 
    answer = Number(updatedEquation[0]);

    //Addition and subtraction operations will be evaluated for the updated equation
    for (let j = 1; j < updatedEquation.length; j++) {
        if (updatedEquation[j] === "+") {
            answer += Number(updatedEquation[j + 1]);
            j++;
        } else if (updatedEquation[j] === "-") {
            answer -= Number(updatedEquation[j + 1]);
            j++;
        }
    }

    // Decimal answers will be rounded to up to 5 decimal places if necessary.
    // The + sign will drop any extra zeroes at the end
    result.textContent = +answer.toFixed(5);
});





// Event Listeners for calculator buttons
backspaceBtn.addEventListener("click", () => {
    inputEquation.value = inputEquation.value.slice(0, -1);
});

clearBtn.addEventListener("click", () => {
    inputEquation.value = '';
    result.textContent = '';
    answer = 0;
});

Array.from(numberBtns).forEach(numBtn => {
    numBtn.addEventListener("click", () => {
        inputEquation.value += numBtn.value;
    });
});

//Event Listener for number keys pressed on keyboard
document.addEventListener("keydown", (event) => {
    if (event.key >= '0' && event.key <= '9') {
        inputEquation.value += event.key;
    }
});

Array.from(operatorBtns).forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () => {
        if (inputEquation.value === '') {
            alert("Invalid Format: Equation must begin with a number value");
        } else {
            inputEquation.value += operatorBtn.value;
        }
    });
});

equalsBtn.addEventListener("click", () => evaluateEquation(inputEquation.value));

