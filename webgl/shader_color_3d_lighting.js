//TODO: SHADER HAS HARD CODING

const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
precision mediump float;

uniform mat4 u_MVPMatrix;
uniform mat4 uMMatrix;
uniform mat4 uNMatrix;

attribute vec3 aVertexPosition;
attribute vec4 a_Color;
attribute vec3 aVertexNormal;

varying vec4 vColor;
varying vec4 vTransformedNormal;
varying vec4 vPosition;

void main() {  
  vColor = a_Color;
  gl_Position = u_MVPMatrix * vec4(aVertexPosition, 1.0);
  vTransformedNormal = uNMatrix * vec4(aVertexNormal, 0.0);
  vPosition = uMMatrix * vec4(aVertexPosition, 1.0);
}
`;

const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `
precision mediump float;

uniform vec4 uLightPosition;
uniform vec3 uLightColor;
uniform vec3 uAmbientLightColor;

varying vec4 vTransformedNormal;
varying vec4 vPosition;
varying vec4 vColor;

// The entry point for our fragment shader.
void main()
{
  vec4 directionVector = uLightPosition - vPosition;
  float distanceToLight = length(directionVector);
  vec4 lightDirection = normalize(directionVector);
  float directional = clamp(dot(vTransformedNormal, lightDirection), 0.0, 1.0);

  vec3 reflectedVector = reflect(lightDirection.xyz, vTransformedNormal.xyz);
  vec3 eyeVector = normalize(uLightPosition.xyz - vPosition.xyz);
  float s = clamp(dot(reflectedVector, eyeVector), 0.0, 1.0);
  s = pow(s, 50.0);

  vec3 specLight = vec3(s, 0.0, 0.0);

  vec3 lc = uLightColor;
  //vec3 lighting = uAmbientLightColor + specLight;
  float attenuation = 1.0 / (1.0 + 0.025 * pow(distanceToLight, 2.0));
  vec3 lighting = uAmbientLightColor + (attenuation * (uLightColor * directional));
  // vec3 lighting = uAmbientLightColor + (uLightColor * directional) + specLight;
  gl_FragColor = vec4(vColor.rgb * lighting, vColor.a);    // Pass the color directly through the pipeline.
}
`;

function shader_color_3d_lighting_draw(gl, draw_data) {
  gl.enable(gl.DEPTH_TEST);

  const program_obj = this;
  gl.useProgram(program_obj.program);

  gl.enableVertexAttribArray(program_obj.aVertexPosition);
  gl.enableVertexAttribArray(program_obj.a_Color);
  gl.enableVertexAttribArray(program_obj.aVertexNormal);
  
  const interleaved = draw_data.interleaved;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  
  const INTERLEAVED_SIZE = GL_VERTEX_SIZE + GL_COLOR_SIZE + GL_NORMAL_SIZE;

  gl.vertexAttribPointer(
    program_obj.aVertexPosition, GL_VERTEX_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, 0);

  gl.vertexAttribPointer(
    program_obj.a_Color, GL_COLOR_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, GL_VERTEX_SIZE * GL_FLOAT_SIZE_BYTES);

  gl.vertexAttribPointer(
    program_obj.aVertexNormal, GL_NORMAL_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, (GL_VERTEX_SIZE + GL_COLOR_SIZE) * GL_FLOAT_SIZE_BYTES);

  const mvMatrix = mat4_multiply2(draw_data.viewMatrix, draw_data.modelMatrix);
  const mvpMatrix = mat4_multiply2(draw_data.projectionMatrix, mvMatrix);

  gl.uniformMatrix4fv(program_obj.u_MVPMatrix, false, mvpMatrix);

  var mvInverse = mat4_inverse(draw_data.modelMatrix);
  var normalMatrix = mat4_transpose(mvInverse);

  gl.uniformMatrix4fv(program_obj.uNMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(program_obj.uMMatrix, false, draw_data.modelMatrix);

  var lightPosition = [0, 0, 0, 1];
  gl.uniform4fv(program_obj.uLightPosition, lightPosition);
  gl.uniform3fv(program_obj.uLightColor, [1, 1, 1]);
  gl.uniform3fv(program_obj.uAmbientLightColor, [1.0, 1.0, 1.0]);
  // gl.uniform3fv(program_obj.uAmbientLightColor, [.0, .0, .0]);

  const draw_ct = interleaved.length / INTERLEAVED_SIZE;
  gl.drawArrays(gl.TRIANGLES, 0, draw_ct);

  if (gl.getError() != 0) {
    alert("Failed to draw!");
  }
  gl.disable(gl.DEPTH_TEST);
}

const shader_color_3d_lighting_shader = {
  name: 'shader_color_3d_lighting'
  , vs: SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER
  , fs: SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER
  , attribs: ['aVertexPosition', 'a_Color', 'aVertexNormal']
  , uniforms: ['u_MVPMatrix', 'uNMatrix', 'uMMatrix'
    , 'uLightPosition', 'uAmbientLightColor', 'uLightColor']
  , draw: shader_color_3d_lighting_draw
};

shader_programs.push(shader_color_3d_lighting_shader);
