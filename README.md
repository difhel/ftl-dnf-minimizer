## Installation
1. Clone the `cpp-httplib` library

`git clone https://github.com/yhirose/cpp-httplib.git`

2. Install the `jsoncpp` library

`sudo apt-get install libjsoncpp-dev`

3. Build the server

`cd backend && g++ main.cpp -o main.o -I/usr/include/jsoncpp -I../cpp-httplib -ljsoncpp`

4. Start backend and frontend

`./backend/main.o`

`cd my-react-app && npm run dev`
