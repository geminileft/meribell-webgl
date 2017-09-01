function Sys_Graphics(renderer_in) {
	this.gl = renderer_in.getGl();
	this.textureLookup = null;
  this.handlers = [];
  this.draw_data = [];
  this.shaders = {};
  //this.viewport = {width:0, height:0};
  this.renderer = renderer_in;
}

Sys_Graphics.prototype.initDisplay = function(width, height) {
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

Sys_Graphics.prototype.loadTextures = function(loadedImages) {
  var textureLookup = {};
  for (var image_name in loadedImages) {
    const image = loadedImages[image_name];
    const texture = createTexture(this.gl, image);
    textureLookup[image_name] = texture;
	}
	this.textureLookup = textureLookup;
}

Sys_Graphics.prototype.initShaders = function() {
  var context = this.gl;
  var gfx = this;
  shader_programs.forEach(function(prog) {
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

Sys_Graphics.prototype.getTexture = function(image_name) {
	return this.textureLookup[image_name];
}

Sys_Graphics.prototype.addHandler = function(handler_in) {
	this.handlers.push(handler_in);
}

Sys_Graphics.prototype.update = function() {
	for (var i = 0;i < this.handlers.length;++i) {
		const handler = this.handlers[i];
		handler.update(this);
	}
}

Sys_Graphics.prototype.drawScene = function() {
  data = this.draw_data;
  const context = this.gl;
  context.clear(context.COLOR_BUFFER_BIT | context.STENCIL_BUFFER_BIT| context.DEPTH_BUFFER_BIT);
  for (var i = 0;i < data.length;++i) {
    const draw_data = data[i];
    var program_obj;
    if (draw_data.shader != null) {
      program_obj = this.shaders[draw_data.shader];      
    }
    else if (draw_data.texture != null) {
      program_obj = this.shaders.texture;
    } else {
      program_obj = this.shaders.single_color;
    }
    program_obj.draw(context, draw_data);
  }
  this.draw_data = [];
}