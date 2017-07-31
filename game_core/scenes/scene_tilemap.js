function Scene_Tilemap(gfx) {
  var game_objects = [];

  const tilemap = TILEMAP_EXPORT_DEFINITION;
  //tilemap = TILEMAP_MAIN_DEFINITION;

  var game_object;
  var bgcolor_game_object;
  var handler_input;
  var graphics_handler_tileset;
  var handler_graphics;
  var handler_gamelogic;

  const size = {wr: 1, hr: 0.8, h:37};

  bgcolor_game_object = new Game_Object(0, 0);
  handler_graphics = new Handler_Graphics_Stencil(size.wr, size.hr);
  bgcolor_game_object.addHandler(handler_graphics);
  const color = {r:254.0 / 255.0, g:215.0 / 255.0, b:171.0 / 255.0, a:1.0};
  //const color = {r:69 / 255, g:222 / 255, b:245 / 255, a:1.0};
  handler_graphics = new Handler_Graphics_Colorbox(16, 11, size.wr, size.hr, color);
  bgcolor_game_object.addHandler(handler_graphics);
  game_objects.push(bgcolor_game_object);

  game_object = new Game_Object(0, 0);
  handler_input = new Handler_Input_Tileset(gfx, size.hr, size.h);
  game_object.addHandler(handler_input);
  handler_graphics = new Handler_Graphics_Tileset(size.h, size.hr, tilemap);
  game_object.addHandler(handler_graphics);
  handler_gamelogic = new Handler_Logic_Tileset(tilemap, size.h, size.hr, gfx);
  game_object.addHandler(handler_gamelogic);
  game_objects.push(game_object);

  return game_objects;
}