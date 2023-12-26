#pragma once

#include <json/json.h>
#include <string>

Json::Value errorToJSON(std::string errorText) {
    Json::Value json_response;
    json_response["error"] = errorText;
    return json_response;
}
