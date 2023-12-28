main.o: main.cpp
	g++ main.cpp -o main.o -I/usr/include/jsoncpp -I../cpp-httplib -ljsoncpp -g

run: main.o
	./main.o

recompile: main.cpp
	g++ main.cpp -o main.o -I/usr/include/jsoncpp -I../cpp-httplib -ljsoncpp -g