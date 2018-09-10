
function Scene_Car_Driving(width, height) {
    var game_objects = [];
  
    var game_object;
    var handler_graphics;
    var matrix_handler;
    var handler_logic;
    var handler_input;
  
    // Setting Up Camera
    const camera_object = new Game_Object(0, 5, 26);
    matrix_handler = new Handler_Graphics_Matrix(width, height
      , 40, .1, 1000, 20);
    camera_object.addHandler(matrix_handler);
    handler_input = new Handler_Input_Camera();
    camera_object.addHandler(handler_input);
    handler_logic = new Handler_Logic_Camera(1.0, 0.005);
    camera_object.addHandler(handler_logic);
    game_objects.push(camera_object);
  
    const line_width = 0.25;
    const line_height = 12.0;

    game_object = new Game_Object(0, 0, 0);
    handler_graphics = new Handler_Graphics_Singlestreet(
      [[0.690, 0.878, 0.902, 1.0], [0.933, 0.510, 0.933, 1.0], [1.0, 1.0, 1.0, 1.0]]
      , matrix_handler
      , line_width
      , line_height
      , 2
      , 7
      , 4.0
      , 1.85
      , camera_object
    );
    game_object.addHandler(handler_graphics);
    game_objects.push(game_object);


    // Setting up box
    game_object = new Game_Object(0, 0, -28);
    handler_graphics = new Handler_Graphics_3dbox(0, 0
      , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
    game_object.addHandler(handler_graphics);
    handler_logic = new Handler_Logic_Basic_Movement(0, 0, -1.0, 0, 0, 100, false);
    game_object.addHandler(handler_logic);
    game_objects.push(game_object);
      
    const scene = new Scene(game_objects);
    return scene;
  }
  
  