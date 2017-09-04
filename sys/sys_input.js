function Sys_Input(env_input_in) {
	this._env_input = env_input_in;
	this._handlers = [];
}

Sys_Input.prototype.addHandler = function(handler_in) {
	this._handlers.push(handler_in);
}

Sys_Input.prototype.update = function() {
	var action_results = this._env_input.get_input();
	var result = null;
	for (var i = 0;i < this._handlers.length;++i) {
		const handler = this._handlers[i];
		action_results  = handler.update(action_results);
		if (action_results === undefined || action_results == null) {
			break;
		}
	}
}