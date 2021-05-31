@echo off
glslc.exe Vertex.vert -o Vertex.spv
glslc.exe Fragment.frag -o Fragment.spv
exit