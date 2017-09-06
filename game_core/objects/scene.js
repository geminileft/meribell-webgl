function Scene(objects_in) {
    this._objects = objects_in;
}
  
Scene.prototype.reset_objects = function() {
    for (var i = 0;i < this._objects.length;++i) {
      const game_object = this._objects[i];
      game_object.clearMessages();
    }
}
/*
system map is a dictionary
with key = name of system
    input, logic, graphics
*/

Scene.prototype.start = function(system_map) {
    for (var j = 0;j < this._objects.length;++j) {
        const object = this._objects[j];
        for(var i = 0;i < object.handlers.length;++i) {
            const handler = object.handlers[i];
            const sys = system_map[handler.sys];
            //TODO: TEST FOR INVALID SYS
            sys.addHandler(handler);
        }
    }
}
