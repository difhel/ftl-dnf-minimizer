// module for parsing states to JsonValue
#pragma once
#include <json/json.h>
#include "algo.h"

Json::Value responseToJSON(statesT states, std::vector<std::string> &answers) {
    Json::Value json_response;
    json_response["data"] = Json::Value(Json::arrayValue);
    for (int i = 0; i < states.size(); i++) {
        json_response["data"].append(Json::Value(Json::arrayValue));
        for (int j = 0; j < states[i].size(); j++) {
            json_response["data"][i].append(Json::Value(Json::arrayValue));
            json_response["data"][i][j].append(states[i][j].row);
            json_response["data"][i][j].append(states[i][j].col);
        }
    }
    json_response["answer"] = Json::Value(Json::arrayValue);
    for (int i = 0; i < answers.size(); i++) {
        json_response["answer"].append(answers[i]);
    }
    return json_response;
}