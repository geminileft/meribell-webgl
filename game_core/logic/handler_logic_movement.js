function Handler_Logic_Movement() {
    this.sys = 'logic';
    this.delta = 0;
    this.pos_delta = 0.25;
}

Handler_Logic_Movement.prototype.update = function() {
    const game_object = this.game_object;

    this.delta += this.pos_delta;
    game_object.x += this.pos_delta;

    if (this.delta > 10 || this.delta < -10) {
        this.pos_delta *= -1;
    }
}
