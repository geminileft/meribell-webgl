const SHADER_COLOR_3D_VERTEX_SHADER = `
uniform mat4 uProjectionMatrix;
uniform mat4 uViewMatrix;
uniform vec3 uRotate;

attribute vec3 aVertices;
attribute vec4 aColors;

varying vec4 vColor;

void main() {
  float theta_x = uRotate.x;
  float sin_t = sin(theta_x);
  float cos_t = cos(theta_x);

  float theta_y = uRotate.y;
  float sin_y = sin(theta_y);
  float cos_y = cos(theta_y);

  float theta_z = uRotate.z;
  float sin_z = sin(theta_z);
  float cos_z = cos(theta_z);

  mat4 rot_x = mat4(
     1,0,0,0
    ,0,cos_t,-sin_t,0
    ,0,sin_t, cos_t,0
    ,0,0,0,1);
  
  mat4 rot_y = mat4(
     cos_y,0,sin_y,0
    ,0,1,0,0
    ,-sin_y,0,cos_y,0
    ,0,0,0,1);

  mat4 rot_z = mat4(
     cos_z,sin_z,0,0
    ,-sin_z,cos_z,0,0
    ,0,0,1,0
    ,0,0,0,1);

  mat4 translate = mat4(
     1,0,0,0
    ,0,1,0,0
    ,0,0,1,0
    ,0,0,0,1);

  mat4 mvMatrix = ((uViewMatrix  * rot_x * rot_y * rot_z) * translate);
  mat4 vp = uProjectionMatrix * mvMatrix;
  gl_Position = vp * vec4(aVertices, 1.0);
  vColor = aColors;
}
`;

const SHADER_COLOR_3D_FRAGMENT_SHADER = `
precision mediump float;

varying vec4 vColor;

void main() {
	gl_FragColor = vColor;
}
`;

function shader_color_3d_draw(gl, draw_data) {
  gl.enable(gl.DEPTH_TEST);

  const program_obj = this;
  gl.useProgram(program_obj.program);
  gl.enableVertexAttribArray(program_obj.aVertices);
  gl.enableVertexAttribArray(program_obj.aColors);
  const interleaved = draw_data.interleaved;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  
  const FLOAT_SIZE_BYTES = 4;

  const VERTEX_SIZE = 3;
  const COLOR_SIZE = 4;

  const INTERLEAVED_SIZE = VERTEX_SIZE + COLOR_SIZE;

  gl.vertexAttribPointer(
    program_obj.aVertices, VERTEX_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * FLOAT_SIZE_BYTES, 0);

  gl.vertexAttribPointer(
    program_obj.aColors, COLOR_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * FLOAT_SIZE_BYTES, VERTEX_SIZE * FLOAT_SIZE_BYTES);

  var pMatrix = mat4.create();
  var identity = mat4.create();
  var viewMatrix = mat4.create();

  const ratio = 640 / 480;
  const angle = 45;
  mat4.perspective(angle, ratio, .1, 100.0, pMatrix);

  mat4.identity(viewMatrix);
  const pos = draw_data.pos;
  const cameraMove = {x:0 - pos.x, y:2 - pos.y, z:-5 - pos.z};
  const translateVector = [-cameraMove.x, -cameraMove.y, cameraMove.z];
  mat4.translate(viewMatrix, translateVector);
  gl.uniformMatrix4fv(program_obj.uProjectionMatrix, false, pMatrix);
  gl.uniformMatrix4fv(program_obj.uViewMatrix, false, viewMatrix);
  gl.uniform3f(program_obj.uRotate
    , draw_data.rotate.x, draw_data.rotate.y, draw_data.rotate.z);
  gl.drawArrays(gl.TRIANGLES, 0, interleaved.length / INTERLEAVED_SIZE);

  if (gl.getError() != 0) {
    alert("Failed to draw!");
  }
  gl.disable(gl.DEPTH_TEST);
}

const shader_color_3d_shader = {
  name: 'shader_color_3d'
  , vs: SHADER_COLOR_3D_VERTEX_SHADER
  , fs: SHADER_COLOR_3D_FRAGMENT_SHADER
  , attribs: ['aVertices', 'aColors']
  , uniforms: ['uProjectionMatrix', 'uViewMatrix', 'uRotate']
  , draw: shader_color_3d_draw
};
