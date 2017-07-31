const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
uniform mat4 uMVPMatrix;
uniform mat4 uNormalMatrix;

attribute vec3 aVertices;
attribute vec4 aColors;
attribute vec3 aVertexNormal;

varying vec4 vColor;
varying vec3 vLighting;

void main() {
  gl_Position = uMVPMatrix * vec4(aVertices, 1.0);
  vColor = aColors;

  highp vec3 ambientLight = vec3(0.0, 0.0, 0.0);
  highp vec3 directionalLightColor = vec3(1.0, 1.0, 0.878);
  highp vec3 directionalVector = vec3(0, 0, 1);

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  vLighting = ambientLight + (directionalLightColor * directional);
}
`;

const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `
precision mediump float;

varying vec4 vColor;
varying vec3 vLighting;

void main() {
  gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
}
`;

function shader_color_3d_lighting_draw(gl, draw_data) {
  gl.enable(gl.DEPTH_TEST);

  const program_obj = this;
  gl.useProgram(program_obj.program);

  gl.enableVertexAttribArray(program_obj.aVertices);
  gl.enableVertexAttribArray(program_obj.aColors);
  gl.enableVertexAttribArray(program_obj.aVertexNormal);
  
  const interleaved = draw_data.interleaved;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  
  const INTERLEAVED_SIZE = GL_VERTEX_SIZE + GL_COLOR_SIZE + GL_NORMAL_SIZE;

  gl.vertexAttribPointer(
    program_obj.aVertices, GL_VERTEX_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, 0);

  gl.vertexAttribPointer(
    program_obj.aColors, GL_COLOR_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, GL_VERTEX_SIZE * GL_FLOAT_SIZE_BYTES);

  gl.vertexAttribPointer(
    program_obj.aVertexNormal, GL_NORMAL_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, (GL_VERTEX_SIZE + GL_COLOR_SIZE) * GL_FLOAT_SIZE_BYTES);

  var mvMatrix = mat4.create();
  mat4.multiply(draw_data.viewMatrix, draw_data.modelMatrix, mvMatrix);

  var mvpMatrix = mat4.create();

  mat4.multiply(draw_data.projectionMatrix, mvMatrix, mvpMatrix);

  gl.uniformMatrix4fv(program_obj.uMVPMatrix, false, mvpMatrix);

  var mvInverse = mat4.create();
  var normalMatrix = mat4.create();

  mat4.inverse(mvMatrix, mvInverse);
  mat4.transpose(mvInverse, normalMatrix);

  gl.uniformMatrix4fv(program_obj.uNormalMatrix, false, normalMatrix);

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
  , attribs: ['aVertices', 'aColors', 'aVertexNormal']
  , uniforms: ['uMVPMatrix', 'uNormalMatrix']
  , draw: shader_color_3d_lighting_draw
};
