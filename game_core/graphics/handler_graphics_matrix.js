//TODO: MATRIX CALCULATIONS CAN USE FUNCTIONAL APPROACH
/**
 * HOW DO WE GET THESE HARD CODED VALUES OUT? DO THEY BELONG HERE?
Handler_Graphics_Matrix.prototype.update = function(gfx) {
    const pos_delta = 0.25;
    const rot_delta = .005;
    
 */
function Handler_Graphics_Matrix(gfx, camera_location, angle, near_plane, far_plane) {
    const ratio = gfx.gl.canvas.width / gfx.gl.canvas.height;
    this.projectionMatrix = mat4_perspective(angle, ratio, near_plane, far_plane);
    this.camera_location = camera_location;
    this.sys = 'graphics';
}

Handler_Graphics_Matrix.prototype.getProjectionMatrix = function() {
    return this.projectionMatrix;
}

Handler_Graphics_Matrix.prototype.getViewMatrix = function() {    
    return mat4_lookat(this.camera_location);
}

Handler_Graphics_Matrix.prototype.update = function(gfx) {
    const pos_delta = 0.25;
    const rot_delta = .005;

    const move_messages = this.game_object.messages['move'];
    if (move_messages != null) {
        for (var i = 0;i < move_messages.length;++i) {
            const msg = move_messages[i];
            const action_in = msg.data;
            switch (action_in) {
                case ACTION_RIGHT:
                    this.camera_location.x_pos += pos_delta;
                break;
                case ACTION_LEFT:
                    this.camera_location.x_pos -= pos_delta;
                break;
                case ACTION_UP:
                    this.camera_location.y_pos -= pos_delta;
                break;
                case ACTION_DOWN:
                    this.camera_location.y_pos += pos_delta;
                break;
                case ACTION_Z_POS:
                    this.camera_location.z_pos -= pos_delta;
                break;
                case ACTION_Z_NEG:
                    this.camera_location.z_pos += pos_delta;
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
}