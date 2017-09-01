function WebGl_Renderer(environment) {
    this.gl  = environment.createWebGLContext();
    const dimensions = environment.getDimensions();
    this.display_size = {
        width: dimensions.width
        , height: dimensions.height
    };
}

WebGl_Renderer.prototype.getGl = function() {
    return this.gl;
}

WebGl_Renderer.prototype.init = function() {
    this.initDisplay(this.display_size.width, this.display_size.height);
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
