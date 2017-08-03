//HARD CODED STUFF FOR DRAWING BOXES

function Scene_Jolene(gfx) {
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
      , [1.0, 0.75, 0.75, 1.0]
      , [1.0, 0.0, 1.0, 1.0]
      , [0.0, 1.0, 1.0, 1.0]
  ];

  game_object = new Game_Object(10, 12, 20);

  const camera_location = {
        x_pos: 10
        , x_rot: 0
        , y_pos: 12
        , y_rot: 0
        , z_pos: 20
        , z_rot: 0
    };

  matrix_handler = new Handler_Graphics_Matrix(gfx, 40, .1, 100);
  game_object.addHandler(matrix_handler);
  handler_input = new Handler_Input_Camera();
  game_object.addHandler(handler_input);
  handler_logic = new Handler_Logic_Camera();
  game_object.addHandler(handler_logic);
  game_objects.push(game_object);

/*******start */

  game_object = new Game_Object(0, 0, 0);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 0, 0);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-4, 0, 0);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-6, 0, 0);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/**************end row */

  game_object = new Game_Object(-2, 2, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, [[1.0, 1.0, 1.0, 1.0]]
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-4, 2, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , color_range, matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-6, 2, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, [[1.0, 1.0, 1.0, 1.0]]
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/*******end row */

  game_object = new Game_Object(0, 4, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 4, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-4, 4, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-6, 4, 2);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/********end row */

  game_object = new Game_Object(0, 6, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 6, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/*******end row */

  game_object = new Game_Object(0, 8, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 8, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-4, 8, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/*******end row */

  game_object = new Game_Object(0, 10, 6);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , color_range, matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 10, 6);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, [[1.0, 1.0, 1.0, 1.0]]
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-6, 10, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/*******end row */

  game_object = new Game_Object(0, 12, 6);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-2, 12, 6);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, color_range
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  game_object = new Game_Object(-6, 12, 4);
  handler_graphics = new Handler_Graphics_3dbox(0, 0, [[1.0, 1.0, 1.0, 1.0]]
    , matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

/*******end row */

  game_object = new Game_Object(0, 14, 6);
  handler_graphics = new Handler_Graphics_3dbox(0, 0
    , [[1.0, 1.0, 0.0, 1.0]], matrix_handler);
  game_object.addHandler(handler_graphics);
  game_objects.push(game_object);

  return game_objects;
}