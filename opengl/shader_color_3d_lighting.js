//TODO: SHADER HAS HARD CODING

const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
uniform mat4 u_MVPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;

attribute vec3 aVertexPosition;
attribute vec4 a_Color;
attribute vec3 aVertexNormal;

varying vec4 v_Color;
varying vec4 vTransformedNormal;
varying vec4 vPosition;

void main() {  
  v_Color = a_Color;
  gl_Position = u_MVPMatrix * vec4(aVertexPosition, 1.0);
  vTransformedNormal = uNMatrix * vec4(aVertexNormal, 1.0);
  vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
}
`;

const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `
precision mediump float;       // Set the default precision to medium. We don't need as high of a
                               // precision in the fragment shader.
varying vec4 v_Color;          // This is the color from the vertex shader interpolated across the
                               // triangle per fragment.

uniform vec3 uDirectionalVector;

varying vec4 vTransformedNormal;
varying vec4 vPosition;

// The entry point for our fragment shader.
void main()
{
  vec3 _uDirectionalVector = uDirectionalVector;

  vec3 ambientLight = vec3(0.1, 0.1, 0.1);
  vec3 directionalLightColor = vec3(1.0, 1.0, 0.878);

  vec3 directionalVector = vec3(-3, 0, -25);
  vec3 lightDirection = normalize(directionalVector - vPosition.xyz);
  //vec3 lightDirection = vec3(0, 0, 1);
  float directional = max(dot(vTransformedNormal.xyz, lightDirection), 0.0);

  vec3 lighting = ambientLight + (directionalLightColor * directional);

  gl_FragColor = vec4(v_Color.rgb * lighting, v_Color.a);    // Pass the color directly through the pipeline.
}
`;

/*
const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec4 a_Color;

uniform mat4 u_MVPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uNMatrix;


varying vec4 v_Color;

void main() {
  highp vec3 uAmbientColor = vec3(0.0, 0.0, 0.0);
  vec3 uPointLightingLocation = vec3(0, 0, -25);
  highp vec3 uPointLightingColor = vec3(1.0, 1.0, 0.878);


  mat4 _uMVMatrix = uMVMatrix;
  highp vec3 directionalVector = vec3(0, 0, 1);

  vec4 mvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
  vec3 lightDirection = normalize(uPointLightingLocation - mvPosition.xyz);

  //lightDirection = vec3(0, 0, 1);

  highp vec4 transformedNormal = uNMatrix * vec4(aVertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, lightDirection), 0.0);

  highp vec3 lighting = uAmbientColor + (uPointLightingColor * directional);
  v_Color = vec4(a_Color.rgb * lighting, a_Color.a);

  gl_Position = u_MVPMatrix * vec4(aVertexPosition, 1.0);
}
`;
const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `

precision mediump float;       // Set the default precision to medium. We don't need as high of a
                               // precision in the fragment shader.
varying vec4 v_Color;          // This is the color from the vertex shader interpolated across the
                               // triangle per fragment.
 
// The entry point for our fragment shader.
void main()
{
    gl_FragColor = v_Color;    // Pass the color directly through the pipeline.
}
`;
*/

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

  var mvMatrix = mat4.create();
  mat4.multiply(draw_data.viewMatrix, draw_data.modelMatrix, mvMatrix);

  var mvpMatrix = mat4.create();

  mat4.multiply(draw_data.projectionMatrix, mvMatrix, mvpMatrix);

  gl.uniformMatrix4fv(program_obj.u_MVPMatrix, false, mvpMatrix);

  var mvInverse = mat4.create();
  var normalMatrix = mat4.create();

  mat4.inverse(mvMatrix, mvInverse);
  mat4.transpose(mvInverse, normalMatrix);

  gl.uniformMatrix4fv(program_obj.uNMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(program_obj.uMVMatrix, false, mvMatrix);

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
  , uniforms: ['u_MVPMatrix', 'uNMatrix', 'uMVMatrix', 'uDirectionalVector']
  , draw: shader_color_3d_lighting_draw
};

shader_programs.push(shader_color_3d_lighting_shader);
