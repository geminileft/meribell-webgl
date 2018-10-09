const GL_FLOAT_SIZE_BYTES = 4;

const GL_VERTEX_SIZE = 3;
const GL_COLOR_SIZE = 4;
const GL_NORMAL_SIZE = 3;

let shader_programs = [];

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


function WebGl_Renderer(environment, loadedImages_in) {
    this.gl  = environment.createWebGLContext();
    const dimensions = environment.getDimensions();
    this.display_size = {
        width: dimensions.width
        , height: dimensions.height
    };
    this.loadedImages = loadedImages_in;
    this.shaders = {};
}

WebGl_Renderer.prototype.getGl = function() {
    return this.gl;
}

WebGl_Renderer.prototype.init = function() {
    this.initDisplay(this.display_size.width, this.display_size.height);
    this.loadTextures(this.loadedImages);
    this.initShaders(shader_programs);
};

WebGl_Renderer.prototype.initDisplay = function(width, height) {
  //TODO: THIS SHOULD BE PART OF THE RENDER TARGET
  var context = this.gl;
  context.clearColor(0, 0, 0, 1);
  context.clearStencil(0);
  context.enable(context.BLEND);
  context.blendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
  context.enable(context.STENCIL_TEST);
  //context.enable(context.DEPTH_TEST);
  context.viewport(0, 0, width, height);
  //this.viewport = {width:width, height:height};
};

WebGl_Renderer.prototype.loadTextures = function(loadedImages) {
  var textureLookup = {};
  for (var image_name in loadedImages) {
    const image = loadedImages[image_name];
    const texture = createTexture(this.gl, image);
    textureLookup[image_name] = texture;
	}
	this.textureLookup = textureLookup;
}

WebGl_Renderer.prototype.initShaders = function(progs) {
  var context = this.gl;
  var gfx = this;
  progs.forEach(function(prog) {
    const program = createProgram(context, prog.vs, prog.fs);
    var program_obj = {program: program, draw: prog.draw};
    prog.attribs.forEach(function(attrib) {
      attribAssign(program_obj, attrib, program, context);
    });
    prog.uniforms.forEach(function(uniform) {
      uniformAssign(program_obj, uniform, program, context);
    });
    gfx.shaders[prog.name] = program_obj;
  });
}

WebGl_Renderer.prototype.drawScene = function(data) {

  const context = this.gl;
  context.clear(context.COLOR_BUFFER_BIT | context.STENCIL_BUFFER_BIT| context.DEPTH_BUFFER_BIT);
  for (var i = 0;i < data.length;++i) {
    const draw_data = data[i];
    var program_obj;
    program_obj = this.shaders[draw_data.shader];      
    /*
    else if (draw_data.texture != null) {
      program_obj = this.shaders.texture;
    } else {
      program_obj = this.shaders.single_color;
    }
    */
    program_obj.draw(context, draw_data);
  }
}

WebGl_Renderer.prototype.getTexture = function(image_name) {
	return this.textureLookup[image_name];
}
