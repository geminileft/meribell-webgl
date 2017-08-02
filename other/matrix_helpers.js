function mat4_perspective(angle, ratio, near_plane, far_plane) {
    var perspectiveMatrix = mat4.create();
    mat4.perspective(angle, ratio, near_plane, far_plane, perspectiveMatrix);
    return perspectiveMatrix;
}