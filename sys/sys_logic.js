function Sys_Logic() {
	this.handlers = [];
}

Sys_Logic.prototype.addHandler = function(handler_in) {
	this.handlers.push(handler_in);
}

Sys_Logic.prototype.update = function() {
	for (var i = 0;i < this.handlers.length;++i) {
		const handler = this.handlers[i];
		handler.update();
	}
}