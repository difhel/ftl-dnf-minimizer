// main module for minimizing DNF of a binary function
#pragma once

#include <vector>
#include <string>
#include <queue>
#include <cmath>


struct cell {
    cell(int row, int col): row(row), col(col) {};
    int row;
    int col;
};

using state = std::vector<cell>;
using statesT = std::vector<state>;

struct answer {
    statesT states;
    std::vector<std::string> answers;
};

answer getAnswer(std::vector<std::vector<std::string>> table) {
    // some ✨magic✨

    // step 1: remove all lines, that have f(args) = 0
    statesT states;
    states.push_back({});
    for (int i = 0; i < table.size(); ++i) {
        // if f(args) = 0
        if (table[i][0] == "0") {
            for (int j = 0; j < table[i].size(); ++j) {
                states[0].push_back(cell(i, j));
            }
        }
    }

    // step 2: we create set with colored cells and coloring all equal
    const int variableCount = log2(table.size());
    std::vector<std::set<std::string>>> colored;
    for (int i = 0; i < table.size(); ++i) {
        // if f(args) = 0
        if (table[i][0] == "0") {
            for (int j = 0; j < table[i].size(); ++j) {
                states[0].push_back(cell(i, j));
            }
        }
    }
    answer ans;
    ans.states = states;
    // ans.states = {
    //     {
    //         {0, 0}, {0, 1}, {0, 2}, {1, 5}
    //     },
    //     {
    //         {2, 0}, {2, 1}, {2, 2}, {2, 5}
    //     },
    //     {
    //         {3, 0}, {3, 5}, {3, 6}, {3, 10}
    //     }
    // };
    ans.answers = {
        "a \\vee b \\vee c",
        "b \\neg d \\vee c"
    };
    return ans;
};
