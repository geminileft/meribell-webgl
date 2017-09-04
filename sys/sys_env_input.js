function Sys_Env_Input(width_in, height_in) {
	this._width = width_in;
	this._height = height_in;
	this._inputHandler = null;
}

Sys_Env_Input.prototype.setInputHandler = function(handler) {
	this._inputHandler = handler;
}

Sys_Env_Input.prototype.getKeyDown = function(e) {
	this._inputHandler.receiveKeyDown(e.key);
}

Sys_Env_Input.prototype.getKeyUp = function(e) {
	this._inputHandler.receiveKeyUp(e.key);
}

Sys_Env_Input.prototype.receiveClickAt = function(x_input, y_input) {
	var x = this._invert_x ? this._width - x_input : x_input;
	var y = this._invert_y ? this._height - y_input : y_input;
	this._actions.push({type:'click', data: {x: x, y: y}});
}

Sys_Env_Input.prototype.receiveKeyDown = function(key_input) {
	this._actions.push({type:'key_down', data: {key: key_input}});
}

Sys_Env_Input.prototype.receiveKeyUp = function(key_input) {
	this._actions.push({type:'key_up', data: {key: key_input}});
}

Sys_Env_Input.prototype.receiveUiEvent = function(event_name) {
	this._actions.push({type:'ui_event', data: {name:event_name}});
}

Sys_Env_Input.prototype.addHandler = function(handler_in) {
	this._handlers.push(handler_in);
}

Sys_Env_Input.prototype.update = function() {
	var action_results = this._actions;
	var result = null;
	for (var i = 0;i < this._handlers.length;++i) {
		const handler = this._handlers[i];
		action_results  = handler.update(action_results);
		if (result === undefined || result == null) {
			break;
		}
	}
	this._actions = [];
}