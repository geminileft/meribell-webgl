function Sys_Graphics(renderer_in) {
  this._handlers = [];
  this._draw_data = [];
  this._renderer = renderer_in;
}

/*
Sys_Graphics.prototype.getRenderer = function() {
	return this._renderer;
}
*/

Sys_Graphics.prototype.addHandler = function(handler_in) {
	this._handlers.push(handler_in);
}

Sys_Graphics.prototype.update = function() {
	for (var i = 0;i < this._handlers.length;++i) {
		const handler = this._handlers[i];
		handler.update(this);
	}
}

Sys_Graphics.prototype.drawScene = function() {
  data = this._draw_data;
  this._renderer.drawScene(data);
  this._draw_data = [];
}

Sys_Graphics.prototype.add_data = function(data) {
    this._draw_data.push(data);
}
