function Handler_Logic_Basic_Movement(x_delta_inc, y_delta_inc, z_delta_inc, x_range, y_range, z_range) {
    this.sys = 'logic';
    this.x_delta = 0;
    this.y_delta = 0;
    this.z_delta = 0;
    this.x_delta_inc = x_delta_inc;
    this.y_delta_inc = y_delta_inc;
    this.z_delta_inc = z_delta_inc;
    this.x_range = x_range;
    this.y_range = y_range;
    this.z_range = z_range;
}

Handler_Logic_Basic_Movement.prototype.update = function() {
    const game_object = this.game_object;

    this.x_delta += this.x_delta_inc;
    this.y_delta += this.y_delta_inc;
    this.z_delta += this.z_delta_inc;
    game_object.x += this.x_delta_inc;
    game_object.y += this.y_delta_inc;
    game_object.z += this.z_delta_inc;

    if (this.x_delta > this.x_range || this.x_delta < -this.x_range) {
        this.x_delta_inc *= -1;
    }
    if (this.y_delta > this.y_range || this.y_delta < -this.y_range) {
        this.y_delta_inc *= -1;
    }
    if (this.z_delta > this.z_range || this.z_delta < -this.z_range) {
        this.z_delta_inc *= -1;
    }
}
