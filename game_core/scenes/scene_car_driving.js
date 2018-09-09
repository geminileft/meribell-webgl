
function Scene_Car_Driving(width, height) {
    var game_objects = [];
  
    var game_object;
    var handler_graphics;
    var matrix_handler;
    var handler_logic;
    var handler_input;
  
    // game_object = new Game_Object(0, 0, 0);
    game_object = new Game_Object(0, 5, 26);
  
    matrix_handler = new Handler_Graphics_Matrix(width, height, 40, .1, 1000);
    game_object.addHandler(matrix_handler);
    handler_input = new Handler_Input_Camera();
    game_object.addHandler(handler_input);
    handler_logic = new Handler_Logic_Camera(1.0, 0.005);
    game_object.addHandler(handler_logic);
    game_objects.push(game_object);
  

    function draw_line_row(i_in, w_in, h_in) {
      const line_length = 12.0;
      const line_length_multi = 1.85;
      game_object = new Game_Object(-6, 0, -line_length * line_length_multi * i_in);
      handler_graphics = new Handler_Graphics_Streetline(
        [[0.690, 0.878, 0.902, 1.0]]
        , matrix_handler
        , w_in
        , h_in
      );
      game_object.addHandler(handler_graphics);
      game_objects.push(game_object);

      game_object = new Game_Object(6, 0, -line_length * line_length_multi * i_in);
      handler_graphics = new Handler_Graphics_Streetline(
        [[0.933, 0.510, 0.933, 1.0]]
        , matrix_handler
        , w_in
        , h_in
      );
      game_object.addHandler(handler_graphics);
      game_objects.push(game_object);

      game_object = new Game_Object(-2, 0, -line_length * line_length_multi * i_in);
      handler_graphics = new Handler_Graphics_Streetline(
        [[1.0, 1.0, 1.0, 1.0]]
        , matrix_handler
        , w_in
        , h_in
      );
      game_object.addHandler(handler_graphics);
      game_objects.push(game_object);
    
      game_object = new Game_Object(2, 0, -line_length * line_length_multi * i_in);
      handler_graphics = new Handler_Graphics_Streetline(
        [[1.0, 1.0, 1.0, 1.0]]
        , matrix_handler
        , w_in
        , h_in
      );
      game_object.addHandler(handler_graphics);
      game_objects.push(game_object);
    }

    const line_width = 0.25;
    const line_height = 12.0;

    for (i = 0;i < 20;++i) {
      draw_line_row(i, line_width, line_height);
    }


    game_object = new Game_Object(0, 0, 0);
    handler_graphics = new Handler_Graphics_3dbox(0, 0
      , [[1.0, 1.0, 1.0, 1.0]], matrix_handler);
    game_object.addHandler(handler_graphics);
    handler_logic = new Handler_Logic_Basic_Movement(0, 0, -0.25, 0, 0, 100);
    game_object.addHandler(handler_logic);
    game_objects.push(game_object);
      
    const scene = new Scene(game_objects);
    return scene;
  }
  
  