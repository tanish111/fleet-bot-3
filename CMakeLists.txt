cmake_minimum_required(VERSION 3.10)
project(Calculator)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(Calculator src/main.cpp src/Calculator.cpp src/crow_all.h)

find_package(Threads REQUIRED)

target_link_libraries(Calculator PRIVATE Threads::Threads)
