function Sys_Env_Input(width_in, height_in) {
	this._width = width_in;
	this._height = height_in;
	this._input_buffer = [];
}

Sys_Env_Input.prototype.get_input = function() {
	var return_val  = this._input_buffer;
	this._input_buffer = [];
	return return_val;
}

Sys_Env_Input.prototype.getKeyDown = function(e) {
	this._input_buffer.push({type:'key_down', data: {key: e.key}});
}

Sys_Env_Input.prototype.getKeyUp = function(e) {
	this._input_buffer.push({type:'key_up', data: {key: e.key}});
}

Sys_Env_Input.prototype.get_mouse_down = function(e) {
	const parentPosition = getPosition(e.currentTarget);
	const xPosition = (e.clientX - parentPosition.x);
	const yPosition = (e.clientY - parentPosition.y);
	const x_norm = xPosition / this._width;
	const y_norm = (this._height - yPosition) / this._height;
	this._input_buffer.push({type:'mouse_down', data: {x: x_norm, y: y_norm}});
}

Sys_Env_Input.prototype.get_mouse_up = function(e) {
	const parentPosition = getPosition(e.currentTarget);
	const xPosition = (e.clientX - parentPosition.x);
	const yPosition = (e.clientY - parentPosition.y);
	const x_norm = xPosition / this._width;
	const y_norm = (this._height - yPosition) / this._height;
	this._input_buffer.push({type:'mouse_up', data: {x: x_norm, y: y_norm}});
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