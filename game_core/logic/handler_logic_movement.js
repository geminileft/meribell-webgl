function Handler_Logic_Movement() {
    this.sys = 'logic';
    this.delta = 0;
    this.pos_delta = 0.25;
}

Handler_Logic_Movement.prototype.update = function() {
    this.delta += this.pos_delta;
    this.game_object.z += this.pos_delta;

    if (this.delta > 10 || this.delta < -10) {
        this.pos_delta *= -1;
    }
}
