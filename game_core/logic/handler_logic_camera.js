function Handler_Logic_Camera(pos_delta, rot_delta) {
    this.sys = 'logic';
    this.pos_delta = pos_delta;
    this.rot_delta = rot_delta;
}

Handler_Logic_Camera.prototype.update = function() {
    // const pos_delta = 0.25;
    // const rot_delta = .005;
    const pos_delta = this.pos_delta;
    const rot_delta = this.rot_delta;

    const game_object = this.game_object;

    const move_messages = game_object.messages['move'];
    if (move_messages != null) {
        for (var i = 0;i < move_messages.length;++i) {
            const msg = move_messages[i];
            const action_in = msg.data;
            switch (action_in) {
                case ACTION_RIGHT:
                    game_object.x += pos_delta;
                break;
                case ACTION_LEFT:
                    game_object.x -= pos_delta;
                break;
                case ACTION_UP:
                    game_object.y -= pos_delta;
                break;
                case ACTION_DOWN:
                    game_object.y += pos_delta;
                break;
                case ACTION_Z_POS:
                    game_object.z -= pos_delta;
                break;
                case ACTION_Z_NEG:
                    game_object.z += pos_delta;
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
