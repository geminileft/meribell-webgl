//SHADER HAS HARD CODING

const SINGLE_COLOR_VERTEX_SHADER = `
uniform mat4 uProjectionMatrix;
uniform vec4 uColor;

attribute vec4 aVertices;

varying vec4 vColor;

void main() {
  gl_Position = uProjectionMatrix * aVertices;
  vColor = uColor;
}
`;

const COLOR_FRAGMENT_SHADER = `
precision mediump float;

varying vec4 vColor;

void main() {
	gl_FragColor = vColor;
}
`;

const TEXTURE_VERTEX_SHADER = `
uniform mat4 uProjectionMatrix;

attribute vec4 aVertices;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main() {
  gl_Position = uProjectionMatrix * aVertices;
  vTextureCoord = aTextureCoord;
}
`;

const TEXTURE_FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main() {
  //203, 74, 21
  vec4 pixel_color = vec4(203.0 / 255.0, 74.0 / 255.0, 21.0 / 255.0, 1.0);
  //needs to have a vec4 for use with *
  vec4 texture_color = texture2D(uSampler, vTextureCoord);
  
  /*
  if (texture_color.a < 1.0) {
    texture_color = vec4(1.0, 0, 0, 1.0);
  }
  */
  
  gl_FragColor = texture_color * pixel_color;
  //gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`;

function texture_draw(gl, draw_data) {
  const program_obj = this;
  gl.useProgram(program_obj.program);
  gl.enableVertexAttribArray(program_obj.aVertices);
  gl.enableVertexAttribArray(program_obj.aTextureCoord);
  const interleaved = draw_data.interleaved;
  const texture = draw_data.texture;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  gl.vertexAttribPointer(program_obj.aVertices, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(program_obj.aTextureCoord, 2, gl.FLOAT, false, 16, 8);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(program_obj.uSampler, 0);
  var pMatrix = mat4.create();
  mat4.ortho(draw_data.x, draw_data.x + draw_data.w
    , draw_data.y, draw_data.y + draw_data.h, -1, 1, pMatrix);
  gl.uniformMatrix4fv(program_obj.uProjectionMatrix, false, pMatrix);
  gl.drawArrays(gl.TRIANGLES, 0, interleaved.length / 4);
  if (gl.getError() != 0) {
    alert("Failed to draw!");
  }
}

function single_color_draw(gl, draw_data) {
  const program_obj = this;
  gl.useProgram(program_obj.program);
  gl.enableVertexAttribArray(program_obj.aVertices);
  const interleaved = draw_data.interleaved;
  var color = {r:1, g:1, b:1, a:1};
  var stencil = true;
  if (draw_data.color) {
    color = draw_data.color;
    stencil = false;
  }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  gl.vertexAttribPointer(program_obj.aVertices, 2, gl.FLOAT, false, 8, 0);
  gl.uniform4f(program_obj.uColor, color.r, color.g, color.b, color.a);
  var pMatrix = mat4.create();
  mat4.ortho(draw_data.x, draw_data.x + draw_data.w
    , draw_data.y, draw_data.y + draw_data.h, -1, 1, pMatrix);
  gl.uniformMatrix4fv(program_obj.uProjectionMatrix, false, pMatrix);

  if (stencil) {
    gl.stencilFunc(gl.ALWAYS, 1, 1);
    gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
    gl.stencilMask(0xFF);
    gl.colorMask(false, false, false, false);
  }
  gl.drawArrays(gl.TRIANGLES, 0, interleaved.length / 2);
  if (stencil) {
    gl.colorMask(true, true, true, true);
    gl.stencilFunc(gl.EQUAL, 1, 1);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
  }

  if (gl.getError() != 0) {
    alert("Failed to draw!");
  }
}

const texture_shader = {
  name: 'texture'
  , vs: TEXTURE_VERTEX_SHADER
  , fs: TEXTURE_FRAGMENT_SHADER
  , attribs: ['aVertices', 'aTextureCoord']
  , uniforms: ['uSampler', 'uProjectionMatrix']
  , draw: texture_draw
};

const single_color_shader = {
  name: 'single_color'
  , vs: SINGLE_COLOR_VERTEX_SHADER
  , fs: COLOR_FRAGMENT_SHADER
  , attribs: ['aVertices']
  , uniforms: ['uColor', 'uProjectionMatrix']
  , draw: single_color_draw
};

var shader_programs = [
  texture_shader
  , single_color_shader
];

