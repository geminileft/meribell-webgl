const TILESET_EDITOR_MODE_NONE = 0;
const TILESET_EDITOR_MODE_INSERT = 1;
const TILESET_EDITOR_MODE_DELETE = 2;

function Handler_Logic_Tileset(tilemap, h, hr, gfx) {
    this.tilemap = tilemap;
    this.h = h;
    this.hr = hr;
    this.gfx = gfx;
    this.editor_mode = TILESET_EDITOR_MODE_NONE;
    this.selected_tile = null;
    this.sys = 'logic';
}

Handler_Logic_Tileset.prototype.update = function() {
    var left = this.game_object.x;
    var bottom = this.game_object.y;

    const viewport = this.gfx.viewport;
    const w = ((viewport.width / viewport.height) * this.h) / this.hr;

    const g_t = 0.1;

    const move_messages = this.game_object.messages['move'];
    if (move_messages != null) {
        for (var i = 0;i < move_messages.length;++i) {
            const msg = move_messages[i];
            const action_in = msg.data;
            switch (action_in) {
                case ACTION_RIGHT:
                    left += g_t;
                break;
                case ACTION_LEFT:
                    left -= g_t;
                break;
                case ACTION_UP:
                    bottom += g_t;
                break;
                case ACTION_DOWN:
                    bottom -= g_t;
                break;
            }
        }
    }

    const ui_messages = this.game_object.messages['ui'];
    if (ui_messages != null) {
        for (var i = 0;i < ui_messages.length;++i) {
            const msg = ui_messages[i];
            const action_in = msg.data.name;
            switch (action_in) {
                case 'add_column':
                    const column_height = this.tilemap.height;
                    const new_column = new Array(column_height).fill(null);
                    const new_column_width = this.tilemap.width + 1;
                    this.tilemap.map.push(new_column);
                    this.tilemap.width = new_column_width;
                break;
                case 'add_row':
                    const column_width = this.tilemap.width;
                    const new_row_height = this.tilemap.height + 1;
                    for (var j = 0;j < column_width;++j) {
                        this.tilemap.map[j].push(null);
                    }
                    this.tilemap.height = new_row_height;
                break;
                case 'mode_none':
                    this.editor_mode = TILESET_EDITOR_MODE_NONE;
                    this.selected_tile = null;
                break;
                case 'mode_insert':
                    this.editor_mode = TILESET_EDITOR_MODE_INSERT;
                break;
                case 'mode_delete':
                    this.editor_mode = TILESET_EDITOR_MODE_DELETE;
                break;
                case 'tile_select':
                    const x_tile = msg.data.x_tile;
                    const y_tile = msg.data.y_tile;
                    if (this.editor_mode == TILESET_EDITOR_MODE_DELETE) {
                        this.tilemap.map[x_tile][y_tile] = null;
                    } else if (this.editor_mode == TILESET_EDITOR_MODE_INSERT) {
                        if (this.selected_tile == null) {
                            this.selected_tile = this.tilemap.map[x_tile][y_tile];
                        } else {
                            this.tilemap.map[x_tile][y_tile] = this.selected_tile;
                        }
                    }
                break;
            }
        }
    }

    const g_x_lb = 0;
    const g_y_lb = 0;
    const g_y_ub = this.tilemap.height - this.h;

    left = Math.max(left, g_x_lb);
    left = Math.min(left + w, this.tilemap.width) - w;

    bottom = Math.max(bottom, g_y_lb);
    bottom = Math.min(bottom, g_y_ub);

    this.game_object.x = parseFloat(left.toFixed(2));
    this.game_object.y = parseFloat(bottom.toFixed(2));
}
