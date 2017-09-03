function Sys_Engine(input_in, graphics_in, logic_in) {
    this._input = input_in;
    this._graphics = graphics_in;
    this._logic = logic_in;
    this._objects = [];
    this._run = run_impl.bind(this);
}

Sys_Engine.prototype.addObject = function(game_object) {
  this._objects.push(game_object);
}

Sys_Engine.prototype.resetObjects = function() {
  for (var i = 0;i < this._objects.length;++i) {
    const game_object = this._objects[i];
    game_object.clearMessages();
  }
}

Sys_Engine.prototype.start = function(scene_objects) {
  const input = this._input;
  var gfx = this._graphics;
  const logic = this._logic;

  for (var i = 0;i < scene_objects.length;++i) {
    this.addObject(scene_objects[i]);
  }

  for (var j = 0;j < this._objects.length;++j) {
    const object = this._objects[j];
    for(var i = 0;i < object.handlers.length;++i) {
      const handler = object.handlers[i];
      switch (handler.sys) {
        case 'graphics':
          gfx.addHandler(handler);
        break;
        case 'input':
          input.addHandler(handler);
        break;
        case 'logic':
          logic.addHandler(handler);
        break;
        default:
          alert('Sys not defined for handler!');
        break;
      }
    }
  }
  this._run();
}

function run_impl() {
  const input = this._input;
  var gfx = this._graphics;
  const logic = this._logic;

  input.update();
  logic.update();
  gfx.update();

  gfx.drawScene();
  this.resetObjects();

  window.setTimeout(this._run, 1000 / 60);
}
