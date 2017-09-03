function Handler_Graphics_Matrix(gl_in, angle, near_plane, far_plane) {
    const ratio = gl_in.canvas.width / gl_in.canvas.height;
    this.projectionMatrix = mat4_perspective(angle, ratio, near_plane, far_plane);
    this.sys = 'graphics';
}

Handler_Graphics_Matrix.prototype.getProjectionMatrix = function() {
    return this.projectionMatrix;
}

Handler_Graphics_Matrix.prototype.getViewMatrix = function() {
    const camera_location = {
        x_pos : this.game_object.x
        , y_pos : this.game_object.y
        , z_pos : this.game_object.z
    };
    //TODO: REFACTOR OUT FROM MAT4_LOOKAT THE OTHER VALUES
    return mat4_lookat(camera_location);
}

Handler_Graphics_Matrix.prototype.update = function(gfx) {
}