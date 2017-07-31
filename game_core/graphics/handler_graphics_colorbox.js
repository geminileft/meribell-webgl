function Handler_Graphics_Colorbox(width, height, w_ratio, h_ratio, color) {
    this.width = width;
    this.height = height;
    this.w_ratio = w_ratio;
    this.h_ratio = h_ratio;
    this.color = color;
    this.sys = 'graphics';
}

Handler_Graphics_Colorbox.prototype.update = function(gfx) {
    const x = this.game_object.x;
    const y = this.game_object.y;
    const width = this.width;
    const height = this.height;
    const color = this.color;
    const data = {
        color: color
        , interleaved:rect_vertices(x, y, width * this.w_ratio, height * this.h_ratio)
        , x: 0
        , y: 0
        , w: width
        , h: height
    };
    gfx.draw_data.push(data);
}
