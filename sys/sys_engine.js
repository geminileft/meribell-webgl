function Sys_Engine(input_in, graphics_in, logic_in) {
    this._input = input_in;
    this._graphics = graphics_in;
    this._logic = logic_in;
    this._objects = [];
    this._run = run_impl.bind(this);
    this._scene = null;
    this._scenes = {};
}

Sys_Engine.prototype.add_scene = function(name, scene) {
  this._scenes[name] = scene;
}
  
Sys_Engine.prototype.start = function(name) {

  //TODO: TEST BAD NAME!!
  const scene = this._scenes[name];

  this._scene = scene;
  const input = this._input;
  var gfx = this._graphics;
  const logic = this._logic;

  const map = {
    graphics : gfx
    , input : input
    , logic : logic
  };

  scene.start(map);

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
  this._scene.reset_objects();

  window.setTimeout(this._run, 1000 / 60);
}
