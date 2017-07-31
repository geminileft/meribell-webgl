const SHADER_LINES_VERTEX_SHADER = `
uniform mat4 uProjectionMatrix;
uniform vec3 uRotate;

uniform vec3 uCameraRotate;
uniform vec3 uCameraTranslate;

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

  float camera_x = uCameraRotate.x;
  float sin_camera_x = sin(camera_x);
  float cos_camera_x = cos(camera_x);

  float sin_camera_y = sin(uCameraRotate.y);
  float cos_camera_y = cos(uCameraRotate.y);

  mat4 rot_x = mat4(
     1,0,0,0
    ,0,cos_t,-sin_t,0
    ,0,sin_t, cos_t,0
    ,0,0,0,1);
  
  mat4 rotate_camera_x = mat4(
     1,0,0,0
    ,0,cos_camera_x,-sin_camera_x,0
    ,0,sin_camera_x, cos_camera_x,0
    ,0,0,0,1);

  mat4 rotate_camera_y = mat4(
     cos_camera_y,0,sin_camera_y,0
    ,0,1,0,0
    ,-sin_camera_y,0,cos_camera_y,0
    ,0,0,0,1);
  
  mat4 translate_camera = mat4(
     1,0,0,0
    ,0,1,0,0
    ,0,0,1,0
    ,uCameraTranslate.x,uCameraTranslate.y,uCameraTranslate.z,1);

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

  mat4 camera_setup = rotate_camera_x * rotate_camera_y * translate_camera;
  mat4 object_setup = rot_x * rot_y * rot_z * translate;

  mat4 vp = uProjectionMatrix * camera_setup  * object_setup;
  gl_Position = vp * vec4(aVertices, 1.0);
  vColor = aColors;
}
`;

const SHADER_LINES_FRAGMENT_SHADER = `
precision mediump float;

varying vec4 vColor;

void main() {
	gl_FragColor = vColor;
}
`;

function shader_lines_draw(gl, draw_data) {
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

  const ratio = 640 / 480;
  const angle = 45;
  mat4.perspective(angle, ratio, .1, 50.0, pMatrix);

  const pos = draw_data.pos;
  gl.uniformMatrix4fv(program_obj.uProjectionMatrix, false, pMatrix);
  const cameraMove = draw_data.camera_location;
  if (cameraMove != null) {
    gl.uniform3f(program_obj.uCameraTranslate, cameraMove.x_pos, cameraMove.y_pos, cameraMove.z_pos);
    gl.uniform3f(program_obj.uCameraRotate, cameraMove.x_rot, cameraMove.y_rot, cameraMove.z_rot);
  } else {
    gl.uniform3f(program_obj.uCameraTranslate, 0, -30, -4);
    gl.uniform3f(program_obj.uCameraRotate, -1.5, 0, 0);
  }
  gl.uniform3f(program_obj.uRotate
    , draw_data.rotate.x, draw_data.rotate.y, draw_data.rotate.z);
  //gl.drawArrays(gl.LINE_STRIP, 0, interleaved.length / INTERLEAVED_SIZE);
  const draw_count = interleaved.length / INTERLEAVED_SIZE;
  gl.drawArrays(gl.LINES, 0, draw_count);

  if (gl.getError() != 0) {
    alert("Failed to draw!");
  }
  gl.disable(gl.DEPTH_TEST);
}

const shader_lines_shader = {
  name: 'shader_lines'
  , vs: SHADER_LINES_VERTEX_SHADER
  , fs: SHADER_LINES_FRAGMENT_SHADER
  , attribs: ['aVertices', 'aColors']
  , uniforms: ['uProjectionMatrix', 'uRotate', 'uCameraRotate', 'uCameraTranslate']
  , draw: shader_lines_draw
};
