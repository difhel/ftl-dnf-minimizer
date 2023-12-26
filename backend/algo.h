// main module for minimizing DNF of a binary function
#pragma once

#include <vector>
#include <string>


struct cell {
    int row;
    int col;
};

using state = std::vector<cell>;
using states = std::vector<state>;

states getStates(std::vector<std::vector<std::string>> table) {
    // some ✨magic✨
    return {
        {
            {1, 1},
            {2, 5}
        }
    }
}