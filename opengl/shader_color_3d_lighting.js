//TODO: SHADER HAS HARD CODING

const SHADER_COLOR_3D_LIGHTING_VERTEX_SHADER = `
uniform mat4 u_MVPMatrix;
uniform mat4 uNormalMatrix;

attribute vec3 a_Position;
attribute vec4 a_Color;
attribute vec3 a_Normal;

varying vec4 v_Color;

void main() {
  gl_Position = u_MVPMatrix * vec4(a_Position, 1.0);

  highp vec3 ambientLight = vec3(0.0, 0.0, 0.0);
  highp vec3 directionalLightColor = vec3(1.0, 1.0, 0.878);
  highp vec3 directionalVector = vec3(0, 0, 1);

  highp vec4 transformedNormal = uNormalMatrix * vec4(a_Normal, 1.0);
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  highp vec3 lighting = ambientLight + (directionalLightColor * directional);
  v_Color = vec4(a_Color.rgb * lighting, a_Color.a);
}
`;

const SHADER_COLOR_3D_LIGHTING_FRAGMENT_SHADER = `
precision mediump float;

varying vec4 v_Color;

void main() {
  gl_FragColor = v_Color;
}
`;

function shader_color_3d_lighting_draw(gl, draw_data) {
  gl.enable(gl.DEPTH_TEST);

  const program_obj = this;
  gl.useProgram(program_obj.program);

  gl.enableVertexAttribArray(program_obj.a_Position);
  gl.enableVertexAttribArray(program_obj.a_Color);
  gl.enableVertexAttribArray(program_obj.a_Normal);
  
  const interleaved = draw_data.interleaved;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(interleaved), gl.STATIC_DRAW);
  
  const INTERLEAVED_SIZE = GL_VERTEX_SIZE + GL_COLOR_SIZE + GL_NORMAL_SIZE;

  gl.vertexAttribPointer(
    program_obj.a_Position, GL_VERTEX_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, 0);

  gl.vertexAttribPointer(
    program_obj.a_Color, GL_COLOR_SIZE, gl.FLOAT, false
    , INTERLEAVED_SIZE * GL_FLOAT_SIZE_BYTES, GL_VERTEX_SIZE * GL_FLOAT_SIZE_BYTES);

  gl.vertexAttribPointer(
    program_obj.a_Normal, GL_NORMAL_SIZE, gl.FLOAT, false
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
  , attribs: ['a_Position', 'a_Color', 'a_Normal']
  , uniforms: ['u_MVPMatrix', 'uNormalMatrix']
  , draw: shader_color_3d_lighting_draw
};

shader_programs.push(shader_color_3d_lighting_shader);
