
function Scene_Car_Driving(width, height) {
    var game_objects = [];
  
    var game_object;
    var handler_graphics;
    var matrix_handler;
    var handler_logic;
    var handler_input;
  
    // game_object = new Game_Object(0, 0, 0);
    game_object = new Game_Object(-2, 3, 11.5);
  
    matrix_handler = new Handler_Graphics_Matrix(width, height, 40, .1, 100);
    game_object.addHandler(matrix_handler);
    handler_input = new Handler_Input_Camera();
    game_object.addHandler(handler_input);
    handler_logic = new Handler_Logic_Camera(0.33, 0.005);
    game_object.addHandler(handler_logic);
    game_objects.push(game_object);
  
    game_object = new Game_Object(0, 0, 0);
    handler_graphics = new Handler_Graphics_Thickline([[0.690, 0.878, 0.902, 1.0]], matrix_handler);
    game_object.addHandler(handler_graphics);
    game_objects.push(game_object);
  
    game_object = new Game_Object(0, 0, -8);
    handler_graphics = new Handler_Graphics_Thickline([[0.933, 0.510, 0.933, 1.0]], matrix_handler);
    game_object.addHandler(handler_graphics);
    game_objects.push(game_object);

    // game_object = new Game_Object(0, 0, 0);
    // handler_graphics = new Handler_Graphics_3dbox(0, 0
    //   , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
    // game_object.addHandler(handler_graphics);
    // game_objects.push(game_object);
    
    const scene = new Scene(game_objects);
    return scene;
  }
  
  