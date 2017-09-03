function Sys_Graphics(renderer_in) {
	this.gl = renderer_in.getGl();
  this.handlers = [];
  this.draw_data = [];
  this.renderer = renderer_in;
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
  this.renderer.drawScene(data);
  this.draw_data = [];
}