function Handler_Input_Camera() {
    this.actions = {dir:[], ui:[]};
    this.sys = 'input';
}

Handler_Input_Camera.prototype.update = function(actions) {
    const new_actions = this.processActions(this.actions, actions);
    this.actions = new_actions;

    const action_in = new_actions.dir[0];

    if (action_in != null) {
        const msg = new Game_Message('move', action_in);
        this.game_object.addMessage(msg);
    }

    for (var i = 0;i < new_actions.ui.length;++i) {
        const ui_action = new_actions.ui[i];
        const msg = new Game_Message('ui', ui_action);
        this.game_object.addMessage(msg);
    }

    return null;
}

Handler_Input_Camera.prototype.processActions = function(current_actions, actions) {
    var direction_actions = current_actions.dir;
    var ui_actions = [];

    const keyActionFunc = function(key_val) {
        var action = null;
        switch (key_val) {
            case 'd': action = ACTION_RIGHT;
            break;
            case 'a': action = ACTION_LEFT;
            break;
            case 's': action = ACTION_Z_NEG;
            break;
            case 'w': action = ACTION_Z_POS;
            break;
            case 'z': action = ACTION_UP;
            break;
            case 'x': action = ACTION_DOWN;
            break;

            case 'j': action = ACTION_ROT_Y_POS;
            break;
            case 'l': action = ACTION_ROT_Y_NEG;
            break;
            case 'k': action = ACTION_ROT_X_NEG;
            break;
            case 'i': action = ACTION_ROT_X_POS;
            break;
            case 'n': action = ACTION_ROT_Z_POS;
            break;
            case 'm': action = ACTION_ROT_Z_NEG;
            break;
        }
        return action;
    }

    const clickActionFunc = function(viewport, data, hr, map_height, game_object) {
        var action = null;
        const pt_y_ratio = data.y / viewport.height;
        if (pt_y_ratio <= hr) {
            const map_width = ((viewport.width / viewport.height) * map_height / hr);
            const pt_x_ratio = data.x / viewport.width;
            const y_tile = Math.floor((pt_y_ratio * map_height) / hr + game_object.y);
            const x_tile = Math.floor((pt_x_ratio * map_width) + game_object.x);
            action = {name:'tile_select', x_tile:x_tile, y_tile: y_tile};
        }

        return action;
    }

    for(var i = 0;i < actions.length;++i) {
        const action_item = actions[i];
        switch (action_item.type) {
            case 'key_down':
                var action = keyActionFunc(action_item.data.key);
                if (action != null) {
                    direction_actions.push(action);
                }
            break;
            case 'key_up':
                var new_dir = [];
                for (var j = 0;j < direction_actions;++j) {
                    dir_action = direction_actions[i];
                    var action = keyActionFunc(action_item.data.key);
                    if (dir_action != action) {
                        new_dir.push(dir_action);
                    }
                }
                direction_actions = new_dir;
            break;
            case 'ui_event':
                ui_actions.push(action_item.data);
            break;
            /*
            case 'click':
                const viewport = this.gfx.viewport;
                const click_action = clickActionFunc(viewport
                    , action_item.data, this.hr, this.map_height, this.game_object);
                if (click_action != null) {
                    ui_actions.push(click_action);
                }
            break;
            */
        }
    }
    return {dir:direction_actions, ui:ui_actions};
}