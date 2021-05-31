#version 450
layout(location = 0) in vec3 InPosition;
layout(location = 1) in vec3 InColor;
layout(location = 2) in vec2 InTexCoord;
layout(location = 3) in vec3 InNormal;

out vec3 FragPos;
out vec3 FragColor;
out vec2 FragTexCoord;
out vec3 FragNormal;
out vec3 FragLightPos;

uniform mat4 Model;
uniform mat4 View;
uniform mat4 Projection;
uniform vec3 LightPos;

void main()
{
	gl_Position = Projection * View * Model * vec4(InPosition, 1.0);
	FragPos = vec3(Model * vec4(InPosition, 1.0));
	FragColor = InColor;
	FragTexCoord = InTexCoord;
	FragNormal = mat3(transpose(inverse(Model))) * InNormal;
	FragLightPos = LightPos;
}