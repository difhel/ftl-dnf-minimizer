// main module for minimizing DNF of a binary function
#pragma once

#include <vector>
#include <string>


struct cell {
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
    answer ans;
    ans.states = {
        {
            {1, 1},
            {2, 5}
        }
    };
    ans.answers = {
        "a \\vee b \\vee c",
        "b \\neg d \\vee c"
    };
    return ans;
};
