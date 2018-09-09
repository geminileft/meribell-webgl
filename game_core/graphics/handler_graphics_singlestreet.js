function Handler_Graphics_Singlestreet(color_range, matrixHandler, width, height) {
	this.projectionMatrix = matrixHandler.getProjectionMatrix();
	this.matrixHandler = matrixHandler;
	this.sys = 'graphics';
	this.width = width;
	this.height = height;

	const vdata = this.getData();
    const colors = array_duplicate(color_range, 6, vdata.count);

    const interleaved = create_interleaved3(
        vdata.vertices, GL_VERTEX_SIZE
        , colors , GL_COLOR_SIZE
        , vdata.normals, GL_NORMAL_SIZE
        , vdata.count);

	this.interleaved = interleaved;
}

Handler_Graphics_Singlestreet.prototype.update = function(gfx) {
	const game_object = this.game_object;

    const x = game_object.x;
    const y = game_object.y;
    const z = game_object.z;

	var identity = mat4.create();

	mat4.identity(identity);


	var working = mat4.create();
	var modelMatrix = mat4.create();

	var modelTranslateMatrix = mat4.create();
	mat4.identity(modelTranslateMatrix);
	mat4.translate(modelTranslateMatrix, [x, y, z]);

    const data = {
        interleaved:this.interleaved
		, modelMatrix: modelTranslateMatrix
		, projectionMatrix: this.projectionMatrix
		, viewMatrix: this.matrixHandler.getViewMatrix()
        , shader: 'shader_color_3d_lighting'
    };
	gfx.add_data(data);
}

Handler_Graphics_Singlestreet.prototype.getData = function() {
	const width = this.width;
	const half_width = width / 2.0;
	const height = this.height;
	const half_height = height / 2.0;

	return {
vertices : [
	half_width, 0.0, -half_height
	, half_width, 0.0, half_height
	, -half_width, 0.0, half_height
	, half_width, 0.0, -half_height
	, -half_width, 0.0, half_height
	, -half_width, 0.0, -half_height
]

, normals : [
	0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
	, 0.0000, -1.0000, 0.0000
]
, count : 6
};
}