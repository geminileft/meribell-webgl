function Handler_Logic_Camera_Location() {
    this.sys = 'logic';
}

Handler_Logic_Camera_Location.prototype.update = function() {
    const data = {x_pos:0, y_pos:-30, z_pos:-10.5, x_rot:-1.3, y_rot:0, z_rot:0};
    const msg = new Game_Message('camera_location', data);
    this.game_object.addMessage(msg);
}
