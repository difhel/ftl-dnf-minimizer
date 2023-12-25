#include <iostream>
#include <vector>
#include <string>
#include <json/json.h>
#include <httplib.h>

using namespace std;
using namespace httplib;

int main() {
    Server svr;

    svr.Get("/ping", [](const Request& req, Response& res) {
        res.set_content("Pong", "text/plain");
    });

    svr.Post("/app", [](const Request& req, Response& res) {
        Json::Value json_req;
        Json::Reader reader;

        // Парсинг JSON из тела запроса
        if (!reader.parse(req.body, json_req)) {
            res.status = 400;
            res.set_content("Invalid JSON format", "text/plain");
            return;
        }

        // Проверка, что входные данные содержат матрицу строк
        if (!json_req.isMember("data") || !json_req["data"].isArray() || json_req["data"].empty()) {
            res.status = 400;
            res.set_content("Invalid input data format", "text/plain");
            return;
        }

        // Обработка данных (здесь может быть ваша логика)
        Json::Value json_response;
        json_response["data"] = json_req["data"];
        json_response["answer"] = Json::Value(Json::arrayValue);
        json_response["answer"].append("a");
        json_response["answer"].append("b");

        // Отправка JSON-ответа
        res.set_content(json_response.toStyledString(), "application/json");
    });

    std::cout << "Server started on http://localhost:8080" << endl;
    svr.listen("0.0.0.0", 8080);

    return 0;
}
