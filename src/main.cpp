#include "crow_all.h"
#include "Calculator.h"

int main() {
    crow::SimpleApp app;
    Calculator calc;

    CROW_ROUTE(app, "/add").methods("GET"_method)(
        [&](const crow::request& req) {
        double a = std::stod(req.url_params.get("a"));
        double b = std::stod(req.url_params.get("b"));
        return crow::response(std::to_string(calc.add(a, b)));
    });

    CROW_ROUTE(app, "/subtract").methods("GET"_method)(
        [&](const crow::request& req) {
        double a = std::stod(req.url_params.get("a"));
        double b = std::stod(req.url_params.get("b"));
        return crow::response(std::to_string(calc.subtract(a, b)));
    });

    CROW_ROUTE(app, "/multiply").methods("GET"_method)(
        [&](const crow::request& req) {
        double a = std::stod(req.url_params.get("a"));
        double b = std::stod(req.url_params.get("b"));
        return crow::response(std::to_string(calc.multiply(a, b)));
    });

    CROW_ROUTE(app, "/divide").methods("GET"_method)(
        [&](const crow::request& req) {
        double a = std::stod(req.url_params.get("a"));
        double b = std::stod(req.url_params.get("b"));
        if (b == 0) {
            return crow::response(400, "Division by zero is not allowed.");
        }
        return crow::response(std::to_string(calc.divide(a, b)));
    });

    app.port(18081).multithreaded().run();
    return 0;
}