function Sys_Env(canvas_id) {
	const canvas = document.getElementById(canvas_id);
	const env_input = new Sys_Env_Input(canvas.width, canvas.height);
	canvas.addEventListener("mousedown", env_input.get_mouse_down.bind(env_input), false);
	canvas.addEventListener("mouseup", env_input.get_mouse_up.bind(env_input), false);
	canvas.addEventListener("keydown", env_input.getKeyDown.bind(env_input), false);
	canvas.addEventListener("keyup", env_input.getKeyUp.bind(env_input), false);

	this._canvas = canvas;
	this._imagesLeftToLoad = 0;
	this._loadedImages = null;
	this._postLoadCallback = null;
	this._env_input = env_input;
}

Sys_Env.prototype.getDimensions = function() {
	return {width:this._canvas.width, height:this._canvas.height};
}

Sys_Env.prototype.createWebGLContext = function() {
	var context = null;
	try {
	    context = this._canvas.getContext("webgl", {stencil:true});
	} catch (e) {
	}
	if (!context) {
	    alert("Could not initialise WebGL, sorry :-(");
	}
	return context;
}

Sys_Env.prototype.loadImages = function(images, postLoadCallback) {
	this._imagesLeftToLoad = images.length;
	this._postLoadCallback = postLoadCallback;
	var image_map = {};

	if (this._imagesLeftToLoad <= 0) {
		this.postImagesLoad();
	}

	for (var i = 0;i < images.length;++i) {
		var image_name = images[i];
		var image = new Image();
		var env = this;
		image.onload = function () {
			var me = this;
			--env.imagesLeftToLoad;
			if (env.imagesLeftToLoad <= 0) {
				env.postImagesLoad();
			}
		}
		image.src = image_name;
		image_map[image_name] = image;
	}
	this._loadedImages = image_map;
}

Sys_Env.prototype.postImagesLoad = function() {
	this._postLoadCallback(this._loadedImages, this);
}

Sys_Env.prototype.get_input = function() {
	return this._env_input;
}
