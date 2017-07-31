function Sys_Env(canvas_id) {
	this.canvas = document.getElementById(canvas_id);
    this.canvas.addEventListener("click", this.getClickPosition.bind(this), false);
		this.canvas.addEventListener("keydown", this.getKeyDown.bind(this), false);
		this.canvas.addEventListener("keyup", this.getKeyUp.bind(this), false);

    this.imagesLeftToLoad = 0;
    this.loadedImages = null;
    this.postLoadCallback = null;
    this.inputHandler = null;
}

Sys_Env.prototype.getDimensions = function() {
	return {width:this.canvas.width, height:this.canvas.height};
}

Sys_Env.prototype.createWebGLContext = function() {
	var context = null;
	try {
	    context = this.canvas.getContext("webgl", {stencil:true});
	} catch (e) {
	}
	if (!context) {
	    alert("Could not initialise WebGL, sorry :-(");
	}
	return context;
}

Sys_Env.prototype.loadImages = function(images, postLoadCallback) {
	this.imagesLeftToLoad = images.length;
	this.postLoadCallback = postLoadCallback;
	var image_map = {};

	if (this.imagesLeftToLoad <= 0) {
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
	this.loadedImages = image_map;
}

Sys_Env.prototype.postImagesLoad = function() {
	this.postLoadCallback(this.loadedImages, this);
}

Sys_Env.prototype.setInputHandler = function(handler) {
	this.inputHandler = handler;
}

Sys_Env.prototype.getClickPosition = function(e) {
  var parentPosition = getPosition(e.currentTarget);
  var xPosition = e.clientX - parentPosition.x;
  var yPosition = e.clientY - parentPosition.y;
  this.inputHandler.receiveClickAt(xPosition, yPosition);
}

Sys_Env.prototype.getKeyDown = function(e) {
	this.inputHandler.receiveKeyDown(e.key);
}

Sys_Env.prototype.getKeyUp = function(e) {
	this.inputHandler.receiveKeyUp(e.key);
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