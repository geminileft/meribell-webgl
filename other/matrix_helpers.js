function mat4_perspective(angle, ratio, near_plane, far_plane) {
    var perspectiveMatrix = mat4.create();
    mat4.perspective(angle, ratio, near_plane, far_plane, perspectiveMatrix);
    return perspectiveMatrix;
}

function mat4_rotate_x(in_matrix, radians) {
    if (in_matrix == null) {
        in_matrix = mat4.create(); 
        mat4.identity(in_matrix);
    }
    var rotate = mat4.create();
    mat4.rotateX(in_matrix, radians, rotate);
    return rotate;
}

function mat4_rotate_y(in_matrix, radians) {
    if (in_matrix == null) {
        in_matrix = mat4.create(); 
        mat4.identity(in_matrix);
    }
    var rotate = mat4.create();
    mat4.rotateY(in_matrix, radians, rotate);
    return rotate;
}
