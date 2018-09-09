function Handler_Graphics_Singlestreet(color_range, matrixHandler, width, height
	, lanes, rows, spacing, top_spacing
) {
	this.projectionMatrix = matrixHandler.getProjectionMatrix();
	this.matrixHandler = matrixHandler;
	this.sys = 'graphics';
	this.width = width;
	this.height = height;
	this.color_range = color_range;
	this.lanes = lanes;
	this.rows = rows;
	this.spacing = spacing;
	this.top_spacing = top_spacing;
}

Handler_Graphics_Singlestreet.prototype.update = function(gfx) {
	const game_object = this.game_object;

    const x = game_object.x;
    const y = game_object.y;
    const z = game_object.z;

	const vdata = this.getData(this.color_range
		, this.lanes
		, this.rows
		, this.spacing
		, this.top_spacing
	);

    const interleaved = create_interleaved3(
        vdata.vertices, GL_VERTEX_SIZE
        , vdata.colors , GL_COLOR_SIZE
        , vdata.normals, GL_NORMAL_SIZE
        , vdata.count);

	var identity = mat4_identity();

    const data = {
        interleaved:interleaved
		, modelMatrix: identity
		, projectionMatrix: this.projectionMatrix
		, viewMatrix: this.matrixHandler.getViewMatrix()
        , shader: 'shader_color_3d_lighting'
    };
	gfx.add_data(data);
}

Handler_Graphics_Singlestreet.prototype.getData = function(
	color_range
	, lanes
	, rows
	, spacing
	, top_spacing
) {
	const SINGLE_VERTEX_COUNT = 6;

	const STANDARD_NORMAL = [
		0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
		, 0.0000, -1.0000, 0.0000
	];

	var right_position = (lanes * spacing) / 2.0;
	var top_position = 0;
	const width = this.width;
	const half_width = width / 2.0;
	const height = this.height;
	const half_height = height / 2.0;

	var my_vertices = [];
	for (var j = 0;j < rows;++j) {
		right_position = (lanes * spacing) / 2.0;
		for(var i = 0;i < lanes + 1;++i) {
			const STANDARD_VERTEX = [
				-right_position + half_width, 0.0, -top_position -half_height
				, -right_position + half_width, 0.0, -top_position + half_height
				, -right_position -half_width, 0.0, -top_position + half_height
				, -right_position + half_width, 0.0, -top_position - half_height
				, -right_position -half_width, 0.0, -top_position + half_height
				, -right_position -half_width, 0.0, -top_position - half_height		
			];
			my_vertices.push.apply(my_vertices, STANDARD_VERTEX);
			right_position -= spacing;
		}
		top_position += (height * top_spacing);
	}

	const ct = (lanes + 1) * SINGLE_VERTEX_COUNT * rows;

	const left_divider_color = color_range[0];
	var ld_colors = [];
	ld_colors = ld_colors.concat(
		left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
	);
	const right_divider_color = color_range[1];
	var rd_colors = [];
	rd_colors = rd_colors.concat(
		right_divider_color
		,right_divider_color
		,right_divider_color
		,right_divider_color
		,right_divider_color
		,right_divider_color
	);
	const lane_color = color_range[2];
	var l_colors = [];
	l_colors = l_colors.concat(
		lane_color
		,lane_color
		,lane_color
		,lane_color
		,lane_color
		,lane_color
	);

	var full_colors = [];
	for (i = 1;i < lanes;++i) {
		full_colors.push.apply(full_colors, l_colors);
	}

	var my_normals = [];
	var my_colors = [];
	const blank = [];
	for(var i = 0;i < lanes + 1;++i) {
		for (var j = 0;j < rows;++j) {
			my_normals.push.apply(my_normals, STANDARD_NORMAL);
			my_colors.push.apply(my_colors
				, blank.concat(ld_colors, full_colors, rd_colors)
			)
		}
	}

	return {
		vertices : my_vertices
		, normals : my_normals
		, colors : my_colors
		, count : ct
	};
}