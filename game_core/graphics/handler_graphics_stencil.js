function Handler_Graphics_Stencil(w_ratio, h_ratio) {
    this.w_ratio = w_ratio;
    this.h_ratio = h_ratio;
    this.sys = 'graphics';
}

Handler_Graphics_Stencil.prototype.update = function(gfx) {
    const x = this.game_object.x;
    const y = this.game_object.y;
    const width = gfx.viewport.width;
    const height = gfx.viewport.height;
    const data = {
        interleaved:rect_vertices(x, y, width * this.w_ratio, height * this.h_ratio)
        , x: 0
        , y: 0
        , w: width
        , h: height
    };
    gfx.draw_data.push(data);
}
