let currentNumber = '';
let operator = '';
let previousNumber = '';

function appendNumber(number) {
    currentNumber += number;
    updateDisplay();
}

function setOperator(op) {
    if (currentNumber === '') return;
    if (previousNumber !== '') {
        calculate();
    }
    operator = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

function clearDisplay() {
    currentNumber = '';
    operator = '';
    previousNumber = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('result').value = currentNumber || previousNumber || '0';
}

async function calculate() {
    if (previousNumber === '' || currentNumber === '' || operator === '') return;

    const a = parseFloat(previousNumber);
    const b = parseFloat(currentNumber);
    let result;

    // Simulate API call
    try {
        // In a real application, you would make a fetch request to your C++ backend
        // const response = await fetch('http://localhost:8080/calculate', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ a, b, operator })
        // });
        // const data = await response.json();
        // result = data.result;

        // For now, we'll just do the calculation locally
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
        }

        currentNumber = result.toString();
        operator = '';
        previousNumber = '';
        updateDisplay();

    } catch (error) {
        console.error('Error calculating:', error);
        clearDisplay();
        document.getElementById('result').value = 'Error';
    }
}