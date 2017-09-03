function Sys_Logic() {
	this._handlers = [];
}

Sys_Logic.prototype.addHandler = function(handler_in) {
	this._handlers.push(handler_in);
}

Sys_Logic.prototype.update = function() {
	for (var i = 0;i < this._handlers.length;++i) {
		const handler = this._handlers[i];
		handler.update();
	}
}