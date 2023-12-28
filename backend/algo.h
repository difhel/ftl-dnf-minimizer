// main module for minimizing DNF of a binary function
#pragma once

#include <vector>
#include <string>
#include <cmath>
#include <set>
#include "permutations.h"
#include <iostream>

struct cell {
    cell(int row, int col): row(row), col(col) {};
    int row;
    int col;
    bool operator<(const cell &other) const {
        return std::pair(row, col) < std::pair(other.row, other.col);
    }
};

using state = std::vector<cell>;
using statesT = std::vector<state>;

struct answer {
    statesT states;
    std::vector<std::string> answers;
};

std::string join(const std::set<std::string>& inputSet) {
    std::string result;
    auto it = inputSet.begin();
    if (it != inputSet.end()) {
        result += *it;
        ++it;
    }
    for (; it != inputSet.end(); ++it) {
        result += " \\vee " + *it;
    }
    return result;
}

void getOnlyAnswers(std::set<std::string> &curResult, std::vector<std::vector<std::string>> &answerChoices, int i, std::vector<std::string> &results) {
    if (i == answerChoices.size() - 1) {
        results.push_back(join(curResult));
        return;
    }; // recursion depth
    for (int x = 0; x < answerChoices[i + 1].size(); ++x) {
        auto newResult = curResult;
        newResult.insert(answerChoices[i + 1][x]);
        getOnlyAnswers(newResult, answerChoices, i + 1, results);
    }
}

answer getAnswer(std::vector<std::vector<std::string>> table) {
    // some ✨magic✨

    std::set<cell> deletedCells; // we will store it to avoid duplicates

    // step 1: remove all lines, that have f(args) = 0
    statesT states;
    states.push_back({});

    const int variableCount = log2(table.size());
    std::vector<std::set<std::string>> colored(table.size() - 1);
    // key - the col number, value - set of colored values

    for (int i = 0; i < table.size(); ++i) {
        // if f(args) = 0
        if (table[i][0] == "0") {
            for (int j = 1; j < table[i].size(); ++j) {
                states[0].push_back(cell(i, j));
                colored[j - 1].insert(table[i][j]);
                deletedCells.insert(cell(i, j));
            }
        }
    }

    // step 2: we create set with colored cells and coloring all equal
    // 0 -> ab, 1 -> ac, ...
    for (int i = 1; i < table[0].size(); ++i) {
        // iterating through columns
        bool addedNewState = false;
        for (int j = 0; j < table.size(); ++j) {
            if (colored[i - 1].find(table[j][i]) != colored[i - 1].end()) {
                if (!addedNewState) {
                    addedNewState = true;
                    states.push_back({});
                }
                states[states.size() - 1].push_back(cell(j, i));
                deletedCells.insert(cell(j, i));
                std::cout << "step 2: deleted " << j << " " << i << std::endl;
                std::cout << "deleted cell should be in the state#" << states.size() - 1 << std::endl;
            }
        }
    }
    states.push_back({cell(0, 0)});

    // step 3: applying the law of absorption
    #ifdef DEBUG
        // auto temp1 = generateVariables(3);
        // auto temp2 = generatePermutations(temp1);
        // for (auto x: temp1) std::cout << x << std::endl;
        // for (auto x: temp2) std::cout << x << std::endl;
    #endif
    const std::vector<char> variables = generateVariables(variableCount);
    const std::vector<std::string> permutations = generatePermutations(variables);
    std::vector<std::vector<std::string>> answerChoices;
    for (int i = 0; i < table.size(); ++i) {
        // vector of non-colored cells (in the format abcdef -> 001??0)


        // i - row
        // j - col
        std::vector<std::pair<std::string, cell>> nonColored;
        // non colored cells ONLY FOR THIS ROW
        // print deletedCells
        std::cout << "deletedCells: " << std::endl;
        for (auto x : deletedCells) std::cout << x.row << " " << x.col << std::endl;
        for (int j = 1; j < table[0].size(); ++j) {
            if (deletedCells.find(cell(i, j)) == deletedCells.end()) {
                // this cell is not colored
                nonColored.push_back({"", cell(i, j)});
                std::string usedVariables = getUsedChars(permutations, j, variableCount);
                int curIndex = 0;
                for (int var = 0; var < variableCount; ++var) {
                    if (usedVariables.find(variables[var]) != std::string::npos) {
                        // variable with number `var` is used
                        nonColored[nonColored.size() - 1].first += table[i][j][curIndex++];
                    } else {
                        nonColored[nonColored.size() - 1].first += '?';
                    }
                }
            }
        }
        #ifdef DEBUG
            std::cout << "non-colored for line " << i << ":";
            for (auto x : nonColored) std::cout << x.second.row << " " << x.second.col << " ";
            std::cout << std::endl;
        #endif
        std::set<cell> toDelete;
        for (int x = 0; x < nonColored.size(); ++x) {
            for (int y = x + 1; y < nonColored.size(); ++y) {
                bool del = true;
                for (int bit = 0; bit < variableCount; ++bit) {
                    std::cout << "checking " << nonColored[x].second.row << " " << nonColored[x].second.col << " and " << nonColored[y].second.row << nonColored[y].second.col << std::endl;
                    std::cout << nonColored[x].first << " " << nonColored[y].first << std::endl;
                    if (nonColored[x].first[bit] == '?') continue;
                    if (nonColored[y].first[bit] == '?') {
                        del = false;
                        break;
                    }
                }
                if (del) toDelete.insert(nonColored[y].second);
            }
        }
        bool addedNewState = false;
        for (auto c : toDelete) {
            if (deletedCells.find(c) != deletedCells.end()) continue;
            if (!addedNewState) {
                addedNewState = true;
                states.push_back({});
            }
            states[states.size() - 1].push_back(c);
            deletedCells.insert(c);
            std::cout << "state 3: deleted " << c.row << " " << c.col << std::endl;
            // std::cout << "(1) Was deleted: " << (deletedCells.find(c) != deletedCells.end()) << std::endl;
            // nonColored.erase(c);
        }
        if (!nonColored.empty()) answerChoices.push_back({});
        for (auto x : nonColored) {
            std::cout << "ADDING TO ANSWER : " << x.second.row << " " << x.second.col << std::endl;
            std::cout << "Was deleted: " << (deletedCells.find(x.second) != deletedCells.end()) << std::endl;
            if (deletedCells.find(x.second) != deletedCells.end()) {
                // std::cout << "deleted != ans " << x.second.row << " " << x.second.col << std::endl;
                continue;
            }
            answerChoices[answerChoices.size() - 1].push_back(x.first);
        }
    }

    // step 4: getting answers
    
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
    // ans.answers = {
    //     "a \\vee b \\vee c",
    //     "b \\neg d \\vee c"
    // };
    std::set<std::string> curResult;
    std::vector<std::string> results;
    std::cout << "answerChoices: " << std::endl;
    for (auto x : answerChoices) {
        for (auto y : x) std::cout << y << " ";
        std::cout << std::endl;
    }
    getOnlyAnswers(curResult, answerChoices, -1, results);
    ans.answers = results;
    return ans;
};
