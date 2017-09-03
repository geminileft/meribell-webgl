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
    this.initShaders();
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

WebGl_Renderer.prototype.initShaders = function() {
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

WebGl_Renderer.prototype.drawScene = function(data) {

  const context = this.gl;
  context.clear(context.COLOR_BUFFER_BIT | context.STENCIL_BUFFER_BIT| context.DEPTH_BUFFER_BIT);
  for (var i = 0;i < data.length;++i) {
    const draw_data = data[i];
    var program_obj;
    if (draw_data.shader != null) {
      program_obj = this.shaders[draw_data.shader];      
    } else {
      //TODO: THIS SHOULD NEVER HAPPEN!!
    }
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