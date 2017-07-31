function Scene_3d(gfx) {
  var game_objects = [];

  var game_object;
  var handler_graphics;
  var matrix_handler;
  var handler_logic;
  var handler_input;

  const color_range = [
      [0.0, 0.0, 1.0, 1.0]
      , [0.0, 1.0, 0.0, 1.0]
      , [1.0, 0.0, 0.0, 1.0]
      , [1.0, 1.0, 0.0, 1.0]
      , [1.0, 0.0, 1.0, 1.0]
      , [0.0, 1.0, 1.0, 1.0]
  ];

  game_object = new Game_Object(0, 0, 0);
  var projectionMatrix = mat4.create();

  matrix_handler = new Handler_Graphics_Matrix(projectionMatrix, gfx);
  game_object.addHandler(matrix_handler);
  handler_input = new Handler_Input_Camera();
  game_object.addHandler(handler_input);
  game_objects.push(game_object);

  game_object = new Game_Object(-1.5, 0, 8);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , projectionMatrix, matrix_handler);
  game_object.addHandler(handler_graphics);
  handler_logic = new Handler_Logic_Rotate(180, true, false, false);
  game_object.addHandler(handler_logic);
  game_objects.push(game_object);

/*
  game_object = new Game_Object(0.0, 0, 0);
  handler_graphics = new Handler_Graphics_HoneycombSurface(0, 0);
  game_object.addHandler(handler_graphics);
  handler_input = new Handler_Input_Camera();
  game_object.addHandler(handler_input);
  game_objects.push(game_object);
*/

  game_object = new Game_Object(0, 0, 0);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], projectionMatrix, matrix_handler);
  game_object.addHandler(handler_graphics);
  handler_logic = new Handler_Logic_Rotate(180, false, true, true);
  game_object.addHandler(handler_logic);
  game_objects.push(game_object);

  return game_objects;
}