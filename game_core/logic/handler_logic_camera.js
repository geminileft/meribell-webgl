function Handler_Logic_Camera() {
    this.sys = 'logic';
}

Handler_Logic_Camera.prototype.update = function() {
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
