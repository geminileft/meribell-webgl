function Handler_Logic_Rotate(rotate_frames, x, y, z) {
    this.rotate_frames = rotate_frames;
    this.frame_tick = 0;
    this.x_rotate = x;
    this.y_rotate = y;
    this.z_rotate = z;
    this.sys = 'logic';
}

Handler_Logic_Rotate.prototype.update = function() {
    var tick = this.frame_tick + 1;
    const adjusted_tick = tick % this.rotate_frames;
    const angle_radians = (adjusted_tick / this.rotate_frames) * 2 * Math.PI;
    const data = {
        r: -angle_radians
        , x: this.x_rotate
        , y: this.y_rotate
        , z: this.z_rotate
    };
    const msg = new Game_Message('rotate', data);
    this.game_object.addMessage(msg);
    this.frame_tick = tick;
}
