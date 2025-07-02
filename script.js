const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

let currentInput = '0';
let operator = null;
let previousInput = '0';
let resetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (button.classList.contains('number')) {
            if (resetDisplay) {
                currentInput = buttonText;
                resetDisplay = false;
            } else {
                currentInput = currentInput === '0' ? buttonText : currentInput + buttonText;
            }
        } else if (button.classList.contains('operator')) {
            if (operator && !resetDisplay) {
                calculate();
            }
            operator = buttonText;
            previousInput = currentInput;
            resetDisplay = true;
        } else if (button.classList.contains('equals')) {
            calculate();
            operator = null;
        } else if (button.classList.contains('clear')) {
            currentInput = '0';
            operator = null;
            previousInput = '0';
            resetDisplay = false;
        } else if (button.classList.contains('decimal')) {
            if (resetDisplay) {
                currentInput = '0.';
                resetDisplay = false;
            } else if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        }
        updateDisplay();
    });
});

function updateDisplay() {
    display.textContent = currentInput;
}

async function calculate() {
    let result;
    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    if (isNaN(num1) || isNaN(num2)) {
        currentInput = 'Error';
        return;
    }

    try {
        let endpoint = '';
        switch (operator) {
            case '+':
                endpoint = 'add';
                break;
            case '-':
                endpoint = 'subtract';
                break;
            case '*':
                endpoint = 'multiply';
                break;
            case '/':
                endpoint = 'divide';
                break;
            default:
                return;
        }

        const response = await fetch(`http://localhost:8080/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num1: num1, num2: num2 }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        result = data.result;
        currentInput = result.toString();
        resetDisplay = true;
    } catch (error) {
        console.error('Error during calculation:', error);
        currentInput = 'Error';
        resetDisplay = true;
    }
}