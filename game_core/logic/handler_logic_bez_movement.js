/*
global
bez3_point_at
*/

function Handler_Logic_Bez_Movement(game_object) {
    this.sys = 'logic';
    this.x_delta = 0;
    this.y_delta = 0;
    this.z_delta = 0;
    this.x_delta_inc = 0;
    this.y_delta_inc = 0;
    this.z_delta_inc = -2;
    this.x_range = 0;
    this.y_range = 0;
    this.z_range = 100;
    this.repeat = false;

    this.cumulative = 0;
    this.max_range = 45;
    this.right_side = -8;
    this.steps = 25;
    this.current_start = game_object.z;
    game_object.addHandler(this);
}

Handler_Logic_Bez_Movement.prototype.update = function() {
    const game_object = this.game_object;
    const pt1 = [0, this.current_start];
    const pt3 = [0, this.current_start + this.max_range];
    const pt2 = [this.right_side, (pt3[1] + pt1[1]) / 2];
    const t = this.cumulative / (this.steps + 1);
    var t_pt = bez3_point_at(pt1, pt2, pt3, t);
    this.cumulative = (this.cumulative + 1) % this.steps;
    if (this.cumulative == 0) {
        this.current_start += this.max_range;
    }

    this.x_delta += this.x_delta_inc;
    this.y_delta += this.y_delta_inc;
    this.z_delta += this.z_delta_inc;
    game_object.x = t_pt[0];
    // game_object.x += this.x_delta_inc;
    game_object.y += this.y_delta_inc;
    game_object.z += this.z_delta_inc;

    if (!this.repeat) {
        return;
    }

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
