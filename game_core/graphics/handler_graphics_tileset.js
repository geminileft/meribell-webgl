function Handler_Graphics_Tileset(height, hr, tilemap) {
    this.height = height;
    this.hr = hr;
    this.tilemap = tilemap;
    this.sys = 'graphics';
}

Handler_Graphics_Tileset.prototype.update = function(gfx) {
    const x = this.game_object.x;
    const y = this.game_object.y;
    const basic_texture = gfx.getTexture("images/tileset copy.png");
    const height = this.height;
    const viewport = gfx.viewport;
    const width = (viewport.width / viewport.height) * height;
    const data = {
        texture:basic_texture
        , interleaved:tile_data(x, y, width / this.hr, height, height, 1, this.tilemap.map)
        , x: x
        , y: y
        , w: (width / this.hr)
        , h: (height / this.hr)
    };
    gfx.draw_data.push(data);
}

function tile_data(tile_x, tile_y, width, height_tile_units, f_h, h_ratio, tilemap_array) {
  var interleaved = [];
  const start_x_index = Math.floor(tile_x);
  const end_x_index = Math.ceil(tile_x + width);
  const start_y_index = Math.floor(tile_y);
  const end_y_index = Math.ceil(tile_y + height_tile_units);
  const f_val = (f_h / height_tile_units) * h_ratio;
  var f_start = start_y_index;
  var x_current = start_x_index;
  var y_current = 0;

  for (var i = start_x_index;i < end_x_index;++i) {
    const arr = tilemap_array[i];
    y_current = f_start;
    for (var j = start_y_index;j < end_y_index;++j) {
        const val = arr[j];
        if (val != null) {
            const x_vert = i;
            const y_vert = j;
            interleaved = interleaved.concat(
                vc_interleaved(
                    square_vertices(x_vert, y_vert, 1)
                    , square_coords(val.l, val.b, TILE_ST_UNIT)
                    , 6)
            );
        }
        y_current += f_val;
    }
    x_current += f_val;
  }
  return interleaved;
}