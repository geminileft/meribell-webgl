/*
global
create_interleaved3
mat4_identity
GL_VERTEX_SIZE
GL_COLOR_SIZE
GL_NORMAL_SIZE
vec3
bez2_point_at
bez3_point_at
bez4_point_at
*/


function Handler_Graphics_Curvedstreet(color_range, matrixHandler, width, height
	, lanes, rows, spacing, top_spacing, camera_obj
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
	this.camera_obj = camera_obj;

	var x2 = bez2_point_at([0,0], [2,2], 0.5);
	var x3 = bez3_point_at([0,2], [0,0], [2,0], 0.5);
	var x4 = bez4_point_at([0,0], [0,2], [2,2], [2,0], 0.5);
	var y = 0;
	var z = x3[0] * y;
}

Handler_Graphics_Curvedstreet.prototype.update = function(gfx) {
	const game_object = this.game_object;

    // const x = game_object.x;
    // const y = game_object.y;
    const z = this.camera_obj.z;

	const size_interval = (this.top_spacing * this.height);
	const start_z = Math.ceil(z / size_interval) * size_interval;

	const vdata = this.getData(this.color_range
		, this.lanes
		, this.rows
		, this.spacing
		, this.top_spacing
		, start_z
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


function get_colors(color_range, lanes, rows) {
	const LEFT_DIVIDER_COLOR_INDEX = 1;
	const RIGHT_DIVIDER_COLOR_INDEX = 0;

	const left_divider_color = color_range[LEFT_DIVIDER_COLOR_INDEX];
	var ld_colors = [];
	ld_colors = ld_colors.concat(
		left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
		,left_divider_color
	);
	const right_divider_color = color_range[RIGHT_DIVIDER_COLOR_INDEX];
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
	for (var i = 1;i < lanes;++i) {
		full_colors.push.apply(full_colors, l_colors);
	}

	var my_colors = [];
	const blank = [];
	for(var i = 0;i < lanes + 1;++i) {
		for (var j = 0;j < rows;++j) {
			my_colors.push.apply(my_colors
				, blank.concat(ld_colors, full_colors, rd_colors)
			)
		}
	}

	return my_colors
}

Handler_Graphics_Curvedstreet.prototype.getData = function(
	color_range
	, lanes
	, rows
	, spacing
	, top_spacing
	, start_z
) {
	const SINGLE_VERTEX_COUNT = 6;

	var right_position = (lanes * spacing) / 2.0;
	var top_position = 0;
	const width = this.width;
	const half_width = width / 2.0;
	const height = this.height;
	const half_height = height / 2.0;

	var my_vertices = [];
	var my_normals = [];
	for (var j = 0;j < rows;++j) {
		right_position = (lanes * spacing) / 2.0;
		for(var i = 0;i < lanes + 1;++i) {

			const pt1_x = -right_position + half_width;
			const pt1_y = 0.0;
			const pt1_z = -top_position -half_height + start_z;
			const p1 = vec3.create([pt1_x, pt1_y, pt1_z]);

			const pt2_x = -right_position + half_width;
			const pt2_y = 0.0;
			const pt2_z = -top_position + half_height + start_z;
			const p2 = vec3.create([pt2_x, pt2_y, pt2_z]);

			const pt3_x = -right_position -half_width;
			const pt3_y = 0.0;
			const pt3_z = -top_position + half_height + start_z;
			const p3 = vec3.create([pt3_x, pt3_y, pt3_z]);
			
			var v = vec3.create();
			var w = vec3.create();

			v = vec3.subtract(p2, p1, v);
			w = vec3.subtract(p3, p1, w);

			const nx = (v[1] * w[2]) - (v[2] * w[1]);
			const ny = (v[2] * w[0]) - (v[0] * w[2]);
			const nz = (v[0] * w[1]) - (v[1] * w[0]);

			var norm = vec3.create([nx, ny, nz]);
			vec3.normalize(norm);

			const STANDARD_VERTEX = [
				pt1_x, pt1_y, pt1_z
				, pt2_x, pt2_y, pt2_z
				, pt3_x, pt3_y, pt3_z
				, -right_position + half_width, 0.0, -top_position - half_height + start_z
				, -right_position -half_width, 0.0, -top_position + half_height + start_z
				, -right_position -half_width, 0.0, -top_position - half_height + start_z	
			];

			const STANDARD_NORMAL = [
				norm[0], norm[1], norm[2]
				, norm[0], norm[1], norm[2]
				, norm[0], norm[1], norm[2]
				, norm[0], norm[1], norm[2]
				, norm[0], norm[1], norm[2]
				, norm[0], norm[1], norm[2]
			];

			my_vertices.push.apply(my_vertices, STANDARD_VERTEX);
			my_normals.push.apply(my_normals, STANDARD_NORMAL);

			right_position -= spacing;
		}
		top_position += (height * top_spacing);
	}

	const ct = (lanes + 1) * SINGLE_VERTEX_COUNT * rows;

	return {
		vertices : my_vertices
		, normals : my_normals
		, colors : get_colors(color_range, lanes, rows)
		, count : ct
	};
}
