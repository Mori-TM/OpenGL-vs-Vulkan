#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) in vec3 InPosition;
layout(location = 1) in vec3 InColor;
layout(location = 2) in vec2 InTexCoord;
layout(location = 3) in vec3 InNormal;

layout(location = 0) out vec3 FragColor;
layout(location = 1) out vec2 FragTexCoord;
layout(location = 2) out vec3 FragNormal;
layout(location = 3) out vec3 FragPos;
layout(location = 4) out vec3 FragLightPos;

layout(binding = 0) uniform UniformBufferObject
{
	mat4 View;
	mat4 Proj;
	vec3 LightPos;
} UBO;

layout(push_constant) uniform PushConstants
{
	layout(offset = 0) mat4 Model;
} PushConts;

void main()
{
	gl_Position = UBO.Proj * UBO.View * PushConts.Model * vec4(InPosition, 1.0);
	FragColor = InColor;
	FragTexCoord = InTexCoord;
	FragNormal = mat3(transpose(inverse(PushConts.Model))) * InNormal;
	FragPos = vec3(PushConts.Model * vec4(InPosition, 1.0));
	FragLightPos = UBO.LightPos;
}