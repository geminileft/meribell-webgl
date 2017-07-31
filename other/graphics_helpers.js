
function square_vertices(l, b, unit) {
    const r = l + unit;
    const t = b + unit;

    const vertices =[
        l, b
        , l, t
        , r, b
        , r, b
        , r, t
        , l, t
    ];
    return vertices;
}

function rect_vertices(l, b, w, h) {
    const r = l + w;
    const t = b + h;

    const vertices =[
        l, b
        , l, t
        , r, b
        , r, b
        , r, t
        , l, t
    ];
    return vertices;
}
function square_coords(l, b, unit){
    const st_l = l;
    const st_b = b;
    const st_r = st_l + unit;
    const st_t = st_b + unit;
    
    const coords =[
    st_l, st_b
    , st_l, st_t
    , st_r, st_b
    
    , st_r, st_b
    , st_r, st_t
    , st_l, st_t
  ];
  return coords;
}

function vc_interleaved(vertices, coords, vc_count) {
    var interleaved = [];
    for (var i = 0;i < vc_count;++i) {
        interleaved.push(vertices[i * 2]);
        interleaved.push(vertices[(i * 2) + 1]);
        interleaved.push(coords[i * 2]);
        interleaved.push(coords[(i * 2) + 1]);
    }
    return interleaved;
}

function create_interleaved2(array1, units1, array2, units2, count) {
    var interleaved = [];
    for (var i = 0;i < count;++i) {
        for (var j = 0;j < units1;++j) {
            interleaved.push(array1[(i * units1) + j]);
        }
        for (var j = 0;j < units2;++j) {
            interleaved.push(array2[(i * units2) + j]);
        }
    }
    return interleaved;    
}

function create_interleaved3(array1, units1, array2, units2, array3, units3, count) {
    var interleaved = [];
    for (var i = 0;i < count;++i) {
        for (var j = 0;j < units1;++j) {
            interleaved.push(array1[(i * units1) + j]);
        }
        for (var j = 0;j < units2;++j) {
            interleaved.push(array2[(i * units2) + j]);
        }
        for (var j = 0;j < units3;++j) {
            interleaved.push(array3[(i * units3) + j]);
        }
    }
    return interleaved;    
}

function array_duplicate(array_of_array, item_count, fit_size) {
/*
    const color_range = [
        [1.0, 0.0, 0.0, 1.0]
    ]
    const colors = array_duplicate(color_range, 1, 36);
*/

/*
    const color_range = [
        [1.0, 0.0, 0.0, 1.0]
        , [0.0, 1.0, 0.0, 1.0]
        , [0.0, 0.0, 1.0, 1.0]
        , [1.0, 1.0, 0.0, 1.0]
        , [1.0, 0.0, 1.0, 1.0]
        , [0.0, 1.0, 1.0, 1.0]
    ]
    const colors = array_duplicate(color_range, 6, 36);
*/

    var results = [];
    var counter = 0;
    var item_index = 0;
    for (var i = 0;i < fit_size;++i) {
        results = results.concat(array_of_array[item_index]);
        counter++;
        if (counter >= item_count) {
            counter = 0;
            item_index = (item_index + 1) % array_of_array.length;
        }
    }
    return results;
}