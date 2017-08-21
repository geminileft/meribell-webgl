const GL_FLOAT_SIZE_BYTES = 4;

const GL_VERTEX_SIZE = 3;
const GL_COLOR_SIZE = 4;
const GL_NORMAL_SIZE = 3;

function createShader(gl, shader_type, source) {
    var shader = gl.createShader(shader_type);
    if (shader == 0) {
        alert("Error creating shader!");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error_msg = gl.getShaderInfoLog(shader);
      alert("Error compiling shader source!\n" + error_msg);
    }
    return shader;
}

function createProgram(gl, vertex_source, fragment_source) {
  var programObj = gl.createProgram();
  var vertex_shader = createShader(gl, gl.VERTEX_SHADER, vertex_source);
  var fragment_shader = createShader(gl, gl.FRAGMENT_SHADER, fragment_source);
  gl.attachShader(programObj, vertex_shader);
  gl.attachShader(programObj, fragment_shader);
  gl.linkProgram(programObj);
  if (!gl.getProgramParameter(programObj, gl.LINK_STATUS)) {
    var info = gl.getProgramInfoLog(programObj);
    alert("Could not initialise shaders with error: " + info);
  }
  return programObj;
}

function attribAssign(obj, a_name, program, gl) {
  var a_val = gl.getAttribLocation(program, a_name);
  if (a_val == -1) {
    alert("Could not find attribute: " + a_name);
  } else {
    obj[a_name] = a_val; 
  }
}

function uniformAssign(obj, u_name, program, gl) {
  var u_val = gl.getUniformLocation(program, u_name);
  if (u_val == null) {
    alert("Could not find uniform: " + u_name);
  } else {
    obj[u_name] = u_val;
  }
}

function createTexture(gl, image) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  return texture;
}

function gl_check_error(gl) {
  if (gl.getError() != 0) {
    alert("Houston, we have a problem!");
  }
}
