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