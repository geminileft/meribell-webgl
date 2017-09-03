function Sys_Env(canvas_id) {
	const canvas = document.getElementById(canvas_id);
	canvas.addEventListener("click", this.getClickPosition.bind(this), false);
	canvas.addEventListener("keydown", this.getKeyDown.bind(this), false);
	canvas.addEventListener("keyup", this.getKeyUp.bind(this), false);
	this._canvas = canvas;

	this._imagesLeftToLoad = 0;
	this._loadedImages = null;
	this._postLoadCallback = null;
	this._inputHandler = null;
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

Sys_Env.prototype.setInputHandler = function(handler) {
	this._inputHandler = handler;
}

Sys_Env.prototype.getClickPosition = function(e) {
  var parentPosition = getPosition(e.currentTarget);
  var xPosition = e.clientX - parentPosition.x;
  var yPosition = e.clientY - parentPosition.y;
  this._inputHandler.receiveClickAt(xPosition, yPosition);
}

Sys_Env.prototype.getKeyDown = function(e) {
	this._inputHandler.receiveKeyDown(e.key);
}

Sys_Env.prototype.getKeyUp = function(e) {
	this._inputHandler.receiveKeyUp(e.key);
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;

  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }

    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}