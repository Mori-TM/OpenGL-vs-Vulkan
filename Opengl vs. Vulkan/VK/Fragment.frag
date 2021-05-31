#version 450
#extension GL_ARB_separate_shader_objects : enable

layout(location = 0) in vec3 FragColor;
layout(location = 1) in vec2 FragTexCoord;
layout(location = 2) in vec3 FragNormal;
layout(location = 3) in vec3 FragPos;
layout(location = 4) in vec3 FragLightPos;

layout(binding = 1) uniform sampler2D Sampler;

layout(location = 0) out vec4 OutColor;

layout(push_constant) uniform PushConstants
{
	layout(offset = 64) bool ShowNormals;
    layout(offset = 68) bool ShowDepth;
} PushConts;

float near = 0.1; 
float far  = 100.0; 
  
float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0; // back to NDC 
    return (2.0 * near * far) / (far + near - z * (far - near));	
}

void main()
{
//	OutColor = vec4(FragNormal, 1.0);
//	OutColor = texture(Sampler, FragTexCoord);
//    OutColor = vec4(FragTexCoord, 1.0, 1.0);
    
    if(PushConts.ShowNormals)
    {
        OutColor = vec4(FragNormal, 1.0);
    }
    else if(PushConts.ShowDepth)
    {
        float depth = LinearizeDepth(gl_FragCoord.z) / far; // divide by far for demonstration
        OutColor = vec4(vec3(depth), 1.0);
    }
    else if(!PushConts.ShowNormals && !PushConts.ShowDepth)
    {
        vec3 LightPos = vec3(1.2, 1.0, 2.0);

	    float ambientStrength = 0.1;
        vec3 ambient = ambientStrength * vec3(1.0, 0.2, 0.1);
  	
        // diffuse 
        vec3 norm = normalize(FragNormal);
        vec3 lightDir = normalize(FragLightPos - FragPos);
        float diff = max(dot(norm, lightDir), 0.0);
        vec3 diffuse = diff * vec3(1.0, 0.5, 0.4);
            
        vec3 result = (ambient + diffuse) * vec3(1.0, 1.0, 1.0);
        OutColor = vec4(result, 1.0) * texture(Sampler, FragTexCoord);
    }
    

//    float depth = LinearizeDepth(gl_FragCoord.z) / far; // divide by far for demonstration
//    OutColor = vec4(vec3(depth), 1.0);
}