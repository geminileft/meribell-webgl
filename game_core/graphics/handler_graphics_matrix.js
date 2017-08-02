//TODO: LOTS OF HARD CODED STUFF

function Handler_Graphics_Matrix(gfx, camera_location) {
    const ratio = gfx.gl.canvas.width / gfx.gl.canvas.height;
    const angle = 40;

    var projectionMatrix = mat4.create();

    mat4.perspective(angle, ratio, .1, 100.0, projectionMatrix);

    this.projectionMatrix = projectionMatrix;

    this.camera_location = camera_location;

    this.sys = 'graphics';
}


Handler_Graphics_Matrix.prototype.getProjectionMatrix = function() {
    return this.projectionMatrix;
}

Handler_Graphics_Matrix.prototype.getViewMatrix = function() {
    //  mat4 camera_setup = rotate_camera_x * rotate_camera_y * translate_camera;

    var identity = mat4.create();
    mat4.identity(identity);

    var rotateX = mat4.create();
	var rotateY = mat4.create();
	var rotateZ = mat4.create();

    mat4.rotateX(identity, this.camera_location.x_rot, rotateX);
	mat4.rotateY(identity, this.camera_location.y_rot, rotateY);

    var workingRotate1 = mat4.create();
    mat4.multiply(rotateX, rotateY, workingRotate1);

    var translateMatrix = mat4.create();
    mat4.identity(translateMatrix);

    const translateVector = [
        -this.camera_location.x_pos
        , -this.camera_location.y_pos
        , -this.camera_location.z_pos
    ];

    mat4.translate(translateMatrix, translateVector);

    var viewMatrix = mat4.create();

    mat4.multiply(workingRotate1, translateMatrix, viewMatrix);
    //mat4.multiply(translateMatrix, workingRotate1, viewMatrix);
    
    //column major
    //https://learnopengl.com/#!Getting-started/Camera
    var camera_pos = vec3.create([this.camera_location.x_pos
        , this.camera_location.y_pos
        , this.camera_location.z_pos]);  
    var camera_target = vec3.create([
        this.camera_location.x_pos - 10
        , this.camera_location.y_pos - 10
        , this.camera_location.z_pos - 20]);

    var vec_diff = vec3.create();
    var camera_direction = vec3.create();
    vec3.subtract(camera_pos, camera_target, vec_diff);
    vec3.normalize(vec_diff, camera_direction);
    
    var up = vec3.create([0,1,0]);
    var up_dir_cross = vec3.create();
    vec3.cross(up, camera_direction, up_dir_cross);
    
    var camera_right = vec3.create();
    vec3.normalize(up_dir_cross, camera_right);

    var camera_up = vec3.create();
    vec3.cross(camera_direction, camera_right, camera_up);

    const m1 = [
        camera_right[0]
        , camera_up[0]
        , camera_direction[0]
        , 0

        , camera_right[1]
        , camera_up[1]
        , camera_direction[1]
        , 0

        , camera_right[2]
        , camera_up[2]
        , camera_direction[2]
        , 0

        , 0
        , 0
        , 0
        , 1
    ];

    const m2 = [
        1
        , 0
        , 0
        , 0

        , 0
        , 1
        , 0
        , 0
        
        , 0
        , 0
        , 1
        , 0

        , -camera_pos[0]
        , -camera_pos[1]
        , -camera_pos[2]
        , 1
    ];

    var viewMatrix2 = mat4.create();

    mat4.multiply(m1, m2, viewMatrix2);


    return viewMatrix2;
}

Handler_Graphics_Matrix.prototype.getViewMatrix2 = function() {
    //  mat4 camera_setup = rotate_camera_x * rotate_camera_y * translate_camera;

    var identity = mat4.create();
    mat4.identity(identity);

    var rotateX = mat4.create();
	var rotateY = mat4.create();
	var rotateZ = mat4.create();

    mat4.rotateX(identity, this.camera_location.x_rot, rotateX);
	mat4.rotateY(identity, this.camera_location.y_rot, rotateY);

    var workingRotate1 = mat4.create();
    mat4.multiply(rotateX, rotateY, workingRotate1);

    var translateMatrix = mat4.create();
    mat4.identity(translateMatrix);

    const translateVector = [
        -this.camera_location.x_pos
        , -this.camera_location.y_pos
        , this.camera_location.z_pos
    ];

    mat4.translate(translateMatrix, translateVector);

    var viewMatrix = mat4.create();

    mat4.multiply(workingRotate1, translateMatrix, viewMatrix);
    //mat4.multiply(translateMatrix, workingRotate1, viewMatrix);
    
    return viewMatrix;
}

Handler_Graphics_Matrix.prototype.update = function(gfx) {
    const pos_delta = 0.25;
    const rot_delta = .005;

    const move_messages = this.game_object.messages['move'];
    if (move_messages != null) {
        for (var i = 0;i < move_messages.length;++i) {
            const msg = move_messages[i];
            const action_in = msg.data;
            switch (action_in) {
                case ACTION_RIGHT:
                    this.camera_location.x_pos += pos_delta;
                break;
                case ACTION_LEFT:
                    this.camera_location.x_pos -= pos_delta;
                break;
                case ACTION_UP:
                    this.camera_location.y_pos -= pos_delta;
                break;
                case ACTION_DOWN:
                    this.camera_location.y_pos += pos_delta;
                break;
                case ACTION_Z_POS:
                    this.camera_location.z_pos -= pos_delta;
                break;
                case ACTION_Z_NEG:
                    this.camera_location.z_pos += pos_delta;
                break;

                case ACTION_ROT_X_POS:
                    this.camera_location.x_rot += rot_delta;
                break;
                case ACTION_ROT_X_NEG:
                    this.camera_location.x_rot -= rot_delta;
                break;
                case ACTION_ROT_Y_POS:
                    this.camera_location.y_rot -= rot_delta;
                break;
                case ACTION_ROT_Y_NEG:
                    this.camera_location.y_rot += rot_delta;
                break;
            }
        }
    }
}
