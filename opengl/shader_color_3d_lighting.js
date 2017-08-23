//TODO: SHADER HAS HARD CODING

const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
precision mediump float;

uniform mat4 u_MVPMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uVMatrix;
uniform mat4 uMMatrix;
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
  vTransformedNormal = uNMatrix * vec4(aVertexNormal, 0.0);
  vec4 oldvPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
  vPosition = uMMatrix * vec4(aVertexPosition, 1.0);
}
`;

const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `
precision mediump float;

uniform mat4 uVMatrix;
uniform vec4 uLightPosition;
uniform vec3 uLightColor;
uniform vec3 uAmbientLightColor;

varying vec4 vTransformedNormal;
varying vec4 vPosition;
varying vec4 v_Color;

// The entry point for our fragment shader.
void main()
{
  vec4 normal = vTransformedNormal;
  vec4 tLightPosition = normalize(uVMatrix * uLightPosition);

  vec4 lightDirection = normalize(uLightPosition - vPosition);
  float directional = max(dot(normal, lightDirection), 0.0);
  vec3 lighting = uAmbientLightColor + (uLightColor * directional);
  gl_FragColor = vec4(v_Color.rgb * lighting, v_Color.a);    // Pass the color directly through the pipeline.
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

  var mvMatrix = mat4.create();
  mat4.multiply(draw_data.viewMatrix, draw_data.modelMatrix, mvMatrix);

  var mvpMatrix = mat4.create();

  mat4.multiply(draw_data.projectionMatrix, mvMatrix, mvpMatrix);

  gl.uniformMatrix4fv(program_obj.u_MVPMatrix, false, mvpMatrix);

  var mvInverse = mat4.create();
  var normalMatrix = mat4.create();

  //mat4.inverse(mvMatrix, mvInverse);
  mat4.inverse(draw_data.modelMatrix, mvInverse);
  mat4.transpose(mvInverse, normalMatrix);

  gl.uniformMatrix4fv(program_obj.uNMatrix, false, normalMatrix);
  gl.uniformMatrix4fv(program_obj.uMVMatrix, false, mvMatrix);
  gl.uniformMatrix4fv(program_obj.uVMatrix, false, draw_data.viewMatrix);
  gl.uniformMatrix4fv(program_obj.uMMatrix, false, draw_data.modelMatrix);

  var lightPosition = [-3, 0, -25, 1];
  gl.uniform4fv(program_obj.uLightPosition, lightPosition);
  gl.uniform3fv(program_obj.uLightColor, [1, 1, .878]);
  //gl.uniform3fv(program_obj.uAmbientLightColor, [.25, .25, .25]);
  gl.uniform3fv(program_obj.uAmbientLightColor, [.0, .0, .0]);

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
  , uniforms: ['u_MVPMatrix', 'uNMatrix', 'uMVMatrix', 'uVMatrix', 'uMMatrix'
    , 'uLightPosition', 'uAmbientLightColor', 'uLightColor']
  , draw: shader_color_3d_lighting_draw
};

shader_programs.push(shader_color_3d_lighting_shader);
