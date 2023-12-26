#include <iostream>
#include <vector>
#include <string>
#include <json/json.h>
#include <httplib.h>
#include "constants.h"
#include "errors.h"
#define DEBUG false

using namespace std;
using namespace httplib;

int main() {
    Server svr;

    svr.Get("/ping", [](const Request& req, Response& res) {
        res.set_content("Pong", "text/plain");
    });

    svr.Post("/api", [](const Request& req, Response& res) {
        Json::Value json_req;
        Json::Reader reader;

        // parse JSON body
        if (!reader.parse(req.body, json_req)) {
            res.status = 400;
            res.set_content(errorToJSON(constants::errorInvalidBody).toStyledString(), "application/json");
            return;
        }

        if (!json_req.isArray() && !json_req.empty()) {
            res.status = 400;
            res.set_content(errorToJSON(constants::errorInvalidFormat).toStyledString(), "application/json");
            return;
        }

        // parsing request
        std::vector<std::vector<std::string>> table;
        for (int i = 0; i < json_req.size(); i++) {
            std::vector<std::string> row;
            for (int j = 0; j < json_req[i].size(); j++) {
                row.push_back(json_req[i][j].asString());
            }
            table.push_back(row);
        }
        #ifdef DEBUG
            cout << "Table:" << endl;
            for (int i = 0; i < table.size(); i++) {
                for (int j = 0; j < table[i].size(); j++) {
                    cout << table[i][j] << " ";
                }
                cout << endl;
            }
        #endif
        Json::Value json_response;
        json_response["data"] = json_req;
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
