function vec_scalar_mul(v, scalar) {
    let result = v.map((current_val) => current_val * scalar);
    return result;
}

function vec_add(v1, v2) {
    let result = v1.map((current_val, current_idx) => current_val + v2[current_idx])
    return result;
}

function bez2_point_at(p0, p1, t) {
    const a = vec_scalar_mul(p0, 1-t);
    const b = vec_scalar_mul(p1, t);
    return vec_add(a, b);
}

function bez3_point_at(p0, p1, p2, t) {
    const a = vec_scalar_mul(p0, Math.pow(1 - t, 2));
    const b = vec_scalar_mul(p1, 2 * t * (1 - t));
    const c = vec_scalar_mul(p2, Math.pow(t, 2));
    return vec_add(vec_add(a, b), c);
}

function bez4_point_at(p0, p1, p2, p3, t) {
    const a = vec_scalar_mul(p0, Math.pow(1 - t, 3));
    const b = vec_scalar_mul(p1, 3 * t * Math.pow(1 - t, 2));
    const c = vec_scalar_mul(p2, 3 * Math.pow(t, 2) * (1 - t));
    const d = vec_scalar_mul(p3, Math.pow(t, 3));
    return vec_add(vec_add(a, b), vec_add(c, d));
}

