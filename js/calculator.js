const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const buttons = document.querySelectorAll(".button");

let expr = [];
let operatorPressed = false;

buttons.forEach(function(button) {

    button.onclick = function() {
        switch (button.textContent) {
            case "AC":
                clearAll();
                break;

            case "←":
                backspace();
                break;

            case ".":
                insertPeriod();
                break;

            case "0":
                insertZero();
                break;

            case "+/-":
                makeNegative();
                break;

            case "+":
            case "-":
            case "x":
            case "÷":
                editExpression(button.textContent);
                break;

            case "=":
                result();
                break;
        
            default:
                insertDigit(button.textContent);
                break;
        }
    }
})

function insertDigit(text) {
    if (operatorPressed) {
        display.textContent = ""; // start new digit
        operatorPressed = false;
    }

    if (display.textContent.includes(".") && display.textContent.split(".")[1] != "") {
        return;
    } else if (display.textContent.length > 6) {
        return;
    } else if (display.textContent == "0") {
        display.textContent = "";
    }
    display.textContent = display.textContent + text;
}

function clearAll() {
    display.textContent = "";
    expression.textContent = "";
    operatorPressed = false;
    expr = [];
}

function backspace() {
    if (operatorPressed) return;

    if (display.textContent.length < 2 
        || display.textContent == "0."
        || (display.textContent.length < 3 && display.textContent.includes("-")) ) {
        display.textContent = "";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }

    if (expression.textContent.includes("=")) {
        expression.textContent = "";
    }
}

function insertPeriod() {
    if (operatorPressed) {
        display.textContent = ""; // start new digit
        operatorPressed = false;
    }

    if (display.textContent == "") {
        display.textContent = "0.";
    } else if (!display.textContent.includes(".")) {
        display.textContent = display.textContent + ".";
    }    
}

function insertZero() {
    if (operatorPressed) {
        display.textContent = ""; // start new digit
        operatorPressed = false;
    }

    if (display.textContent == "0" || display.textContent.includes(".")) {
        return;
    } else {
        insertDigit(0);
    }
}

function makeNegative() {

    if (display.textContent == 0 || expr[expr.length - 1] == "-") {
        return;
    } else if (expression.textContent.includes("=")) {
        expression.textContent = "";
    }

    if (!operatorPressed) {
        if (display.textContent.includes("-")) {
            display.textContent = display.textContent.replace("-", "");
        } else {
            display.textContent = "-" + display.textContent;
        }
    } 
    
}

function editExpression(operator) {
    operator = operator == "x" ? "*" : operator;
    operator = operator == "÷" ? "/" : operator;
    
    if (operatorPressed) {
        expr[expr.length - 1] = operator;
    } else if (display.textContent != "") {
        expr.push(display.textContent);
        expr.push(operator);
        operatorPressed = true;
    }
    expression.textContent = expr.join(" ");
}

function result() {
    if (operatorPressed) {
        expr = expr.slice(0, -1);
    } else {
        expr.push(display.textContent);
    }

    let result = eval(expr.join(''));

    if (!Number.isInteger(result)) {
        result = result.toFixed(1);
    }

    display.textContent = result;
    expression.textContent = expr.join(" ") + " =";
    operatorPressed = false;
    expr = [];
}

// Keybord numbers setup
window.addEventListener("keydown", function(e) {
    switch (e.key) {
        case "Delete":
        clearAll();
        break;

        case "Backspace":
            backspace();
            break;

        case ".":
            insertPeriod();
            break;

        case "0":
            insertZero();
            break;

        case "+":
        case "-":
        case "*":
        case "/":
            editExpression(e.key);
            break;

        case "Enter":
            result();
            break;

        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            insertDigit(e.key);
            break;

        default:
            break;
    }
})