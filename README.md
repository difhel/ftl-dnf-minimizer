# DNF Minimizer
## What is DNF?
**DNF (disjunctive normal form)** - a canonical normal form of a logical formula consisting of a disjunction of conjunctions; it can also be described as an OR of ANDs, a sum of products. Learn more about it on [Wikipedia](https://en.wikipedia.org/wiki/Disjunctive_normal_form).
## What is DNF minimization?
The DNF minimization problem involves simplifying a boolean expression represented in DNF. DNF is a standard way of representing Boolean functions where the expression is a disjunction (OR) of one or more conjunctions (AND) of literals. Each conjunction represents a term in the Boolean function.

The length of the DNF $L(f)$ is the total number of variables and their negations included in all elementary conjunctions. For example:
$$
\begin{gathered}
f=x\bar{y}z\vee xy \vee \bar{z} \\
L(f)=6\end{gathered}$$

This program takes the number of variables of a boolean function, its number, and outputs a list of all the shortest DNFs.

## The algorithm
1. Translate $functionNumber$ into binary form and augment with zeros on the left up to length $2 ^ {variablesCount}$. This number defines the outputs of the function on all argument sets $\{0\dots0, 0\dots1, \dots, 1\dots0, 1\dots1\}$ (there are $2^n$ argument sets for $n$ variables)
2. Construct a table of values of all possible conjunctions of variables.
3. We strike out all conjunctions that are in the lines $f(\dots)=0$.
4. We go through all columns of the table and cross out those conjunctions that match those that were crossed out earlier (when crossing out $f(\dots)=0$).
5. Let's use the absorption law ($A \vee (A \wedge B) = A$) for all remaining conjunctions line by line.
6. Now only meaningful conjunctions remain. We use a complete search, selecting one conjunction in each line. Sort the obtained DNFs by length and leave only the shortest ones.

## Installation
### Installing dependencies
1. Install the [jsoncpp](https://github.com/open-source-parsers/jsoncpp) library. It is required for API and JSON encoding/decoding.
On Debian-based distros, you can install it by
```bash
sudo apt-get install libjsoncpp-dev
```

2. Clone the repo
```bash
git clone https://github.com/difhel/ftl-dnf-minimizer
```

3. Clone submodules
```bash
git submodule update --init
```

4. Build the backend

```bash
cd backend && make
```

5. Build the frontend
```bash
cd my-react-app && npm run build
```

6. Start backend and frontend

```bash
./backend/main.o
```

```bash
cd my-react-app && npm run preview
```
