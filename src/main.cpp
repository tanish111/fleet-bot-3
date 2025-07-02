#include <iostream>
#include "Calculator.h"

int main() {
    Calculator calc;

    double num1 = 10.0;
    double num2 = 5.0;

    std::cout << "Addition: " << calc.add(num1, num2) << std::endl;
    std::cout << "Subtraction: " << calc.subtract(num1, num2) << std::endl;
    std::cout << "Multiplication: " << calc.multiply(num1, num2) << std::endl;
    std::cout << "Division: " << calc.divide(num1, num2) << std::endl;
    std::cout << "Division by zero: " << calc.divide(num1, 0) << std::endl;

    return 0;
}
