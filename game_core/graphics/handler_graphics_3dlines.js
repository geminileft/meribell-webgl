function Handler_Graphics_3dlines(rotate_x, rotate_y) {
    this.rotate_x = rotate_x;
    this.rotate_y = rotate_y;
    this.sys = 'graphics';
}

Handler_Graphics_3dlines.prototype.update = function(gfx) {
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

    const x = this.game_object.x;
    const y = this.game_object.y;
    const z = this.game_object.z;
    const vertices = triangle_vertices(0,0,0);
    const interleaved = create_interleaved2(
        vertices, 3
        , color_values(), 4
        , 12);
    const r_z = this.rotate_z || 0;
    const data = {
        interleaved:interleaved
        , pos: {x: x, y: y, z: z}
        , rotate: {x: this.rotate_x, y: this.rotate_y, z: r_z}
        , shader: 'shader_lines'
    };
    gfx.draw_data.push(data);
}

function triangle_vertices(x_pos, y_pos, z_pos) {

    var vertices = [
        // Front face
            x_pos + 0.0, y_pos + 1.0,  z_pos + 0.0,
            x_pos + -1.0, y_pos + -1.0,  z_pos + 1.0,
            x_pos + 1.0, y_pos + -1.0,  z_pos + 1.0,

        // Right face
            x_pos + 0.0, y_pos + 1.0,  z_pos + 0.0,
            x_pos + 1.0, y_pos + -1.0,  z_pos + 1.0,
            x_pos + 1.0, y_pos + -1.0, z_pos + -1.0,

        // Back face
            x_pos + 0.0,  y_pos + 1.0,  z_pos + 0.0,
            x_pos + 1.0, y_pos + -1.0, z_pos + -1.0,
            x_pos + -1.0, y_pos + -1.0, z_pos + -1.0,

        // Left face
            x_pos + 0.0, y_pos + 1.0,  z_pos + 0.0,
            x_pos + -1.0, y_pos + -1.0, z_pos + -1.0,
            x_pos + -1.0, y_pos + -1.0,  z_pos + 1.0
    ];
    return vertices;
}

function color_values() {
        colors = [
        1.0, 0.0, 0.0, 1.0, // Front face
        0.0, 1.0, 0.0, 1.0, // Back face
        0.0, 0.0, 1.0, 1.0, // Front face

        1.0, 0.0, 0.0, 1.0, // Front face
        0.0, 0.0, 1.0, 1.0, // Front face
        0.0, 1.0, 0.0, 1.0, // Back face

        1.0, 0.0, 0.0, 1.0, // Front face
        0.0, 1.0, 0.0, 1.0, // Back face
        0.0, 0.0, 1.0, 1.0, // Front face

        1.0, 0.0, 0.0, 1.0, // Front face
        0.0, 0.0, 1.0, 1.0, // Front face
        0.0, 1.0, 0.0, 1.0, // Back face
    ];
    return colors;
}