function Sys_Engine(input, graphics, logic) {
    this.input = input;
    this.graphics = graphics;
    this.logic = logic;
    this.objects = [];
    this.run = run_impl.bind(this);
}

Sys_Engine.prototype.addObject = function(game_object) {
  this.objects.push(game_object);
}

Sys_Engine.prototype.resetObjects = function() {
  for (var i = 0;i < this.objects.length;++i) {
    const game_object = this.objects[i];
    game_object.clearMessages();
  }
}

Sys_Engine.prototype.start = function(scene_objects) {
  const input = this.input;
  var gfx = this.graphics;
  const logic = this.logic;

  for (var i = 0;i < scene_objects.length;++i) {
    this.addObject(scene_objects[i]);
  }

  for (var j = 0;j < this.objects.length;++j) {
    const object = this.objects[j];
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
  this.run();
}

function run_impl() {
  const input = this.input;
  var gfx = this.graphics;
  const logic = this.logic;

  input.update();
  logic.update();
  gfx.update();

  gfx.drawScene();
  this.resetObjects();

  window.setTimeout(this.run, 1000 / 60);
}
