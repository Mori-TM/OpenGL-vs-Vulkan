#version 450
in vec3 FragPos;
in vec3 FragColor;
in vec2 FragTexCoord;
in vec3 FragNormal;
in vec3 FragLightPos;

out vec4 OutColor;

uniform sampler2D Sampler;
uniform bool ShowNormals;
uniform bool ShowDepth;

float near = 0.1; 
float far  = 100.0; 
  
float LinearizeDepth(float depth) 
{
    float z = depth * 2.0 - 1.0; // back to NDC 
    return (2.0 * near * far) / (far + near - z * (far - near));	
}

void main()
{
    if(ShowNormals)
    {
        OutColor = vec4(FragNormal, 1.0);
    }
    else if(ShowDepth)
    {
        float depth = LinearizeDepth(gl_FragCoord.z) / far; // divide by far for demonstration
        OutColor = vec4(vec3(depth), 1.0);
    }
    else if(!ShowNormals && !ShowDepth)
    {
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
}