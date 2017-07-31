function Handler_Graphics_HoneycombSurface(rotate_x, rotate_y) {
    this.rotate_x = rotate_x;
    this.rotate_y = rotate_y;
    this.camera_location = {x_pos:0, x_rot:-.305, y_pos:-9.25, y_rot:0, z_pos:-23.5, z_rot:0};
    this.sys = 'graphics';
}

Handler_Graphics_HoneycombSurface.prototype.update = function(gfx) {
    const rotate_messages = this.game_object.messages['rotate'];

    if (rotate_messages != null) {
        for (var r_m = 0;r_m < rotate_messages.length;++r_m) {
            const r_msg = rotate_messages[r_m];
            const msg_data = r_msg.data;
            if (msg_data.x == true) {
                this.rotate_x = msg_data.r;
            }
            if (msg_data.y == true) {
                this.rotate_y = msg_data.r;
            }
            if (msg_data.z == true) {
                this.rotate_z = msg_data.r;
            }
        }
    }

/*
    const camera_location_messages = this.game_object.messages['camera_location'];
    if (camera_location_messages != null) {
        for (var msg_idx = 0;msg_idx < camera_location_messages.length;++msg_idx) {
            const msg = camera_location_messages[msg_idx];
            const msg_data = msg.data;
            camera_location = msg_data;
        }
    }

    const g_t = 0.1;
*/
    const pos_delta = 0.25;
    const rot_delta = .005;

    const move_messages = this.game_object.messages['move'];
    if (move_messages != null) {
        for (var i = 0;i < move_messages.length;++i) {
            const msg = move_messages[i];
            const action_in = msg.data;
            switch (action_in) {
                case ACTION_RIGHT:
                    this.camera_location.x_pos -= pos_delta;
                break;
                case ACTION_LEFT:
                    this.camera_location.x_pos += pos_delta;
                break;
                case ACTION_UP:
                    this.camera_location.y_pos -= pos_delta;
                break;
                case ACTION_DOWN:
                    this.camera_location.y_pos += pos_delta;
                break;
                case ACTION_Z_POS:
                    this.camera_location.z_pos += pos_delta;
                break;
                case ACTION_Z_NEG:
                    this.camera_location.z_pos -= pos_delta;
                break;

                case ACTION_ROT_X_POS:
                    this.camera_location.x_rot += rot_delta;
                break;
                case ACTION_ROT_X_NEG:
                    this.camera_location.x_rot -= rot_delta;
                break;
                case ACTION_ROT_Y_POS:
                    this.camera_location.y_rot -= rot_delta;
                break;
                case ACTION_ROT_Y_NEG:
                    this.camera_location.y_rot += rot_delta;
                break;
            }
        }
    }

    const camera_location = this.camera_location;

    const x = this.game_object.x;
    const y = this.game_object.y;
    const z = this.game_object.z;
    const hex_count = 7;
    const vertices = this.getVertices(hex_count);
    const VERTEX_COUNT = 12;
    const interleaved = create_interleaved2(
        vertices, 3
        , this.getColors(hex_count), 4
        , hex_count * VERTEX_COUNT);
    const r_z = this.rotate_z || 0;
    const data = {
        interleaved:interleaved
        , pos: {x: x, y: y, z: z}
        , rotate: {x: this.rotate_x, y: this.rotate_y, z: r_z}
        , shader: 'shader_lines'
        , camera_location: camera_location
    };
    gfx.draw_data.push(data);
}

function toRadians(degrees) {
    return degrees / 180 * Math.PI;
}

Handler_Graphics_HoneycombSurface.prototype.getVertices  = function(count) {
    const start_x = 0;
    const start_z = 12;


    const angle = 30;
    //const side_width = 2.25;
    const side_width = 1.9;
    const half_width = side_width / 2;
    const half_height = side_width * 2 * Math.cos(toRadians(angle));
    const delta_z = side_width;
    const half_dz = side_width * 2 * Math.cos(toRadians(angle));
    const half_dx = side_width * 2 * Math.sin(toRadians(angle));

    var vertices = [];
    for (var i = 0;i < count; ++i) {

        const ml_x = start_x - half_width - (half_dx / 2);
        const ml_z = start_z - (i * half_dz) - (half_dz / 2);

        const mr_x = start_x + ( half_width + (half_dx / 2) );
        const mr_z = ml_z;

        

        vertices = vertices.concat([
            //bl
            -half_width, 0.0,  start_z - (i * half_height)
            //br
            , half_width, 0.0,  start_z - (i * half_height)

            //bl
            , -half_width, 0.0,  start_z - (i * half_height)
            //ml
            , ml_x, 0.0,  ml_z

            //br
            , half_width, 0.0,  start_z - (i * half_height)
            //mr
            , mr_x, 0.0, mr_z

            //ml
            , ml_x, 0.0,  ml_z
            //tl
            , -half_width, 0.0,  start_z - (half_height) - (i * half_height)

            //tr
            , half_width, 0.0,  start_z - (half_height) - (i * half_height)
            //tl
            , -half_width, 0.0,  start_z - (half_height) - (i * half_height)

            //tr
            , half_width, 0.0,  start_z - (half_height) - (i * half_height)
            //mr
            , mr_x, 0.0, mr_z
        ]);
    }
    return vertices;
}

Handler_Graphics_HoneycombSurface.prototype.getColors  = function(count) {
    var colors = [];
    for(var i = 0;i < count;++i) {
        colors = colors.concat([
            1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0

            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
            
            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
            
            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
            
            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
            
            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
            
            , 1.0, 1.0, 1.0, 1.0
            , 1.0, 1.0, 1.0, 1.0
        ]);
    }
    return colors;
}