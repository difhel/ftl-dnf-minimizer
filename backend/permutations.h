// helper module for permutations
#pragma once
#include <vector>
#include <string>
#include <algorithm>
#include <functional>


std::vector<char> generateVariables(int n) {
    std::vector<char> variables;
    char currentVariable = 'a';

    for (int i = 0; i < n; ++i) {
        variables.push_back(currentVariable++);
    }

    return variables;
}

std::vector<std::string> generatePermutations(const std::vector<char> &variables) {
    std::vector<std::string> result;
    std::function<void(const std::vector<char>&, int)> generate = [&](const std::vector<char>& current, int start) {
        if (!current.empty()) {
            result.push_back(std::string(current.begin(), current.end()));
        }
        for (int i = start; i < variables.size(); i++) {
            std::vector<char> updatedCurrent(current);
            updatedCurrent.push_back(variables[i]);
            generate(updatedCurrent, i + 1);
        }
    };

    generate({}, 0);

    std::sort(result.begin(), result.end(), [](const std::string& a, const std::string& b) {
        return a.length() < b.length();
    });
    return result;
}

std::string getUsedChars(const std::vector<std::string> &permutations, int permutationNumber, int variableCount) {
    return permutations[permutationNumber - 1];
}

// function generateCombinations(variables: string[]): string[] {
//     const result: string[] = [];

//     function generate(current: string[], start: number) {
//         if (current.length > 0) {
//             result.push(current.join(''));
//         }
//         for (let i = start; i < variables.length; i++) {
//             generate([...current, variables[i]], i + 1);
//         }
//     }

//     generate([], 0);

//     return result.sort((a, b) => a.length - b.length);
// }