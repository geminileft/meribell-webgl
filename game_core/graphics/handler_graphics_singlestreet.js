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

	var identity = mat4_identity();

    const data = {
        interleaved:this.interleaved
		, modelMatrix: identity
		, projectionMatrix: this.projectionMatrix
		, viewMatrix: this.matrixHandler.getViewMatrix()
        , shader: 'shader_color_3d_lighting'
    };
	gfx.add_data(data);
}

Handler_Graphics_Singlestreet.prototype.getData = function() {
	const lanes = 1;

	const spacing = 4.0;
	const half_spacing = (lanes * spacing) / 2.0;

	const width = this.width;
	const half_width = width / 2.0;
	const height = this.height;
	const half_height = height / 2.0;

	const SINGLE_VERTEX_COUNT = 6;

	const STANDARD_NORMAL = [
		0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
	];

	var my_normals = STANDARD_NORMAL;

	for(var i = 0;i < lanes;++i) {
		my_normals.push.apply(my_normals, STANDARD_NORMAL);
	}

	return {
vertices : [
	-half_spacing + half_width, 0.0, -half_height
	, -half_spacing + half_width, 0.0, half_height
	, -half_spacing -half_width, 0.0, half_height
	, -half_spacing + half_width, 0.0, -half_height
	, -half_spacing -half_width, 0.0, half_height
	, -half_spacing -half_width, 0.0, -half_height

	, half_spacing + half_width, 0.0, -half_height
	, half_spacing + half_width, 0.0, half_height
	, half_spacing -half_width, 0.0, half_height
	, half_spacing + half_width, 0.0, -half_height
	, half_spacing -half_width, 0.0, half_height
	, half_spacing -half_width, 0.0, -half_height

]

, normals : my_normals
, count : 2 * SINGLE_VERTEX_COUNT
};
}