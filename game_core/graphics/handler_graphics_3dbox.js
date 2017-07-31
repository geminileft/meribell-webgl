function Handler_Graphics_3dbox(rotate_x, rotate_y,
	color_range, projectionMatrix, matrixHandler) {
    this.rotate_x = rotate_x;
    this.rotate_y = rotate_y;
	this.projectionMatrix = projectionMatrix;
	this.matrixHandler = matrixHandler;
    this.sys = 'graphics';

	const vdata = hg3d_data();
    const colors = array_duplicate(color_range, 6, vdata.count);

    const interleaved = create_interleaved3(
        vdata.vertices, GL_VERTEX_SIZE
        , colors , GL_COLOR_SIZE
        , vdata.normals, GL_NORMAL_SIZE
        , vdata.count);

	this.interleaved = interleaved;
}

Handler_Graphics_3dbox.prototype.update = function(gfx) {
	/*
    const rotate_messages = this.game_object.messages['rotate'];
    if (rotate_messages != null) {
        for (var r_m = 0;r_m < rotate_messages.length;++r_m) {
            const r_msg = rotate_messages[r_m];
            const msg_data = r_msg.data;
            if (msg_data.x == true) {
                this.rotate_x = msg_data.r;
            }
            if (msg_data.y == true) {
                this.rotate_y = msg_data.r;
            }
            if (msg_data.z == true) {
                this.rotate_z = msg_data.r;
            }
        }
    }
	*/

    const x = this.game_object.x;
    const y = this.game_object.y;
    const z = this.game_object.z;
    
    //const r_z = this.rotate_z || 0;

	var identity = mat4.create();

	mat4.identity(identity);

	var rotateX = mat4.create();
	var rotateY = mat4.create();
	//var rotateZ = mat4.create();

	mat4.rotateX(identity, this.rotate_x, rotateX);
	mat4.rotateY(identity, this.rotate_y, rotateY);
	//mat4.rotateZ(identity, r_z, rotateZ);

	var working = mat4.create();
	var working2 = mat4.create();
	var modelMatrix = mat4.create();
	var mvMatrix = mat4.create();

	var modelTranslateMatrix = mat4.create();
	mat4.identity(modelTranslateMatrix);
	mat4.translate(modelTranslateMatrix, [x, y, -z]);

	mat4.multiply(modelTranslateMatrix, rotateX, working);
	/*
	mat4.multiply(working, rotateY, working2);
	mat4.multiply(working2, rotateZ, modelMatrix);
	*/
	mat4.multiply(working, rotateY, modelMatrix);

    const data = {
        interleaved:this.interleaved
		, modelMatrix: modelMatrix
		, projectionMatrix: this.projectionMatrix
		, viewMatrix: this.matrixHandler.getViewMatrix()
        , shader: 'shader_color_3d_lighting'
    };
    gfx.draw_data.push(data);
}

function hg3d_data() {
	return {
vertices : [
	1.000000, -1.000000, -1.000000
	, 1.000000, -1.000000, 1.000000
	, -1.000000, -1.000000, 1.000000
	, 1.000000, -1.000000, -1.000000
	, -1.000000, -1.000000, 1.000000
	, -1.000000, -1.000000, -1.000000

	, 1.000000, 1.000000, -0.999999
	, -1.000000, 1.000000, -1.000000
	, -1.000000, 1.000000, 1.000000
	, 1.000000, 1.000000, -0.999999
	, -1.000000, 1.000000, 1.000000
	, 0.999999, 1.000000, 1.000001

	, 1.000000, -1.000000, -1.000000
	, 1.000000, 1.000000, -0.999999
	, 0.999999, 1.000000, 1.000001
	, 1.000000, -1.000000, -1.000000
	, 0.999999, 1.000000, 1.000001
	, 1.000000, -1.000000, 1.000000

	, 1.000000, -1.000000, 1.000000
	, 0.999999, 1.000000, 1.000001
	, -1.000000, 1.000000, 1.000000
	, 1.000000, -1.000000, 1.000000
	, -1.000000, 1.000000, 1.000000
	, -1.000000, -1.000000, 1.000000

	, -1.000000, -1.000000, 1.000000
	, -1.000000, 1.000000, 1.000000
	, -1.000000, 1.000000, -1.000000
	, -1.000000, -1.000000, 1.000000
	, -1.000000, 1.000000, -1.000000
	, -1.000000, -1.000000, -1.000000

	, 1.000000, 1.000000, -0.999999
	, 1.000000, -1.000000, -1.000000
	, -1.000000, -1.000000, -1.000000
	, 1.000000, 1.000000, -0.999999
	, -1.000000, -1.000000, -1.000000
	, -1.000000, 1.000000, -1.000000


]

, normals : [
	0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000

	, 0.0000, 1.0000, 0.0000
	, 0.0000, 1.0000, 0.0000
	, 0.0000, 1.0000, 0.0000
	, 0.0000, 1.0000, 0.0000
	, 0.0000, 1.0000, 0.0000
	, 0.0000, 1.0000, 0.0000

	, 1.0000, 0.0000, 0.0000
	, 1.0000, 0.0000, 0.0000
	, 1.0000, 0.0000, 0.0000
	, 1.0000, 0.0000, 0.0000
	, 1.0000, 0.0000, 0.0000
	, 1.0000, 0.0000, 0.0000

	, -0.0000, -0.0000, 1.0000
	, -0.0000, -0.0000, 1.0000
	, -0.0000, -0.0000, 1.0000
	, -0.0000, -0.0000, 1.0000
	, -0.0000, -0.0000, 1.0000
	, -0.0000, -0.0000, 1.0000

	, -1.0000, -0.0000, -0.0000
	, -1.0000, -0.0000, -0.0000
	, -1.0000, -0.0000, -0.0000
	, -1.0000, -0.0000, -0.0000
	, -1.0000, -0.0000, -0.0000
	, -1.0000, -0.0000, -0.0000

	, 0.0000, 0.0000, -1.0000
	, 0.0000, 0.0000, -1.0000
	, 0.0000, 0.0000, -1.0000
	, 0.0000, 0.0000, -1.0000
	, 0.0000, 0.0000, -1.0000
	, 0.0000, 0.0000, -1.0000


]

, count : 36

};
}