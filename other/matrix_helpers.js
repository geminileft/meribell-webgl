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

function mat4_translate(in_matrix, translateVector) {
    if (in_matrix == null) {
        in_matrix = mat4.create();
        mat4.identity(in_matrix);
    }
    mat4.translate(in_matrix, translateVector);
    return in_matrix;
}

function mat4_multiply(a, b) {
    var mat_input = mat4.create();
    var mat_output = mat4.create();

    const length = arguments.length;

    mat_input = a;

    for (var i = 1;i < length; ++i) {
        mat4.multiply(mat_input, arguments[i], mat_output);
        for (var j = 0;j < mat_output.length; ++j) {
            mat_input[j] = mat_output[j];
        }
    }
    return mat_output;
}

function mat4_lookat(camera_location) {
    //https://learnopengl.com/#!Getting-started/Camera
    var camera_pos = vec3.create([camera_location.x_pos
        , camera_location.y_pos
        , camera_location.z_pos]);
    //TODO: FIX HARDCODING BELOW
    var camera_target = vec3.create([
        camera_location.x_pos
        , camera_location.y_pos
        , camera_location.z_pos - 20]);

    var vec_diff = vec3.create();
    var camera_direction = vec3.create();
    vec3.subtract(camera_pos, camera_target, vec_diff);
    vec3.normalize(vec_diff, camera_direction);
    //TODO: FIX HARDCODING BELOW
    var up = vec3.create([0,1,0]);
    var up_dir_cross = vec3.create();
    vec3.cross(up, camera_direction, up_dir_cross);
    
    var camera_right = vec3.create();
    vec3.normalize(up_dir_cross, camera_right);

    var camera_up = vec3.create();
    vec3.cross(camera_direction, camera_right, camera_up);

    const m1 = [
        camera_right[0], camera_up[0], camera_direction[0], 0
        , camera_right[1], camera_up[1], camera_direction[1], 0
        , camera_right[2], camera_up[2], camera_direction[2], 0
        , 0, 0, 0, 1
    ];

    const m2 = [
        1, 0, 0, 0
        , 0, 1, 0, 0
        , 0, 0, 1, 0
        , -camera_pos[0], -camera_pos[1], -camera_pos[2], 1
    ];

    return mat4_multiply(m1, m2);
}

function mat4_multiply2(m1, m2) {
    var newMatrix = mat4.create();
    mat4.multiply(m1, m2, newMatrix);
    return newMatrix;
}

function mat4_inverse(m) {
    var newMatrix = mat4.create();
    mat4.inverse(m, newMatrix);
    return newMatrix;
}

function mat4_transpose(m) {
    var newMatrix = mat4.create();
    mat4.transpose(m, newMatrix);
    return newMatrix;
}

function mat4_identity() {
    var identity = mat4.create();
	mat4.identity(identity);
    return identity;
}