function Sys_Input(width, height, invert_x, invert_y) {
	this.width = width;
	this.height = height;
	this.invert_x = invert_x;
	this.invert_y = invert_y;
	this.actions = [];
	this.handlers = [];
}

Sys_Input.prototype.receiveClickAt = function(x_input, y_input) {
	var x = this.invert_x ? this.width - x_input : x_input;
	var y = this.invert_y ? this.height - y_input : y_input;
	this.actions.push({type:'click', data: {x: x, y: y}});
}

Sys_Input.prototype.receiveKeyDown = function(key_input) {
	this.actions.push({type:'key_down', data: {key: key_input}});
}

Sys_Input.prototype.receiveKeyUp = function(key_input) {
	this.actions.push({type:'key_up', data: {key: key_input}});
}

Sys_Input.prototype.receiveUiEvent = function(event_name) {
	this.actions.push({type:'ui_event', data: {name:event_name}});
}

Sys_Input.prototype.addHandler = function(handler_in) {
	this.handlers.push(handler_in);
}

Sys_Input.prototype.update = function() {
	var action_results = this.actions;
	var result = null;
	for (var i = 0;i < this.handlers.length;++i) {
		const handler = this.handlers[i];
		action_results  = handler.update(action_results);
		if (result === undefined || result == null) {
			break;
		}
	}
	this.actions = [];
}