//TODO: ALL HANDLERS NEEDS CLEANUP

function Game_Object(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.handlers = [];
    this.messages = {};
}

Game_Object.prototype.addHandler = function(handler) {
    this.handlers.push(handler);
    handler.game_object = this;
}

Game_Object.prototype.addMessage = function(message) {
    var messages = this.messages[message.type];
    if (messages == null) {
        messages = [];
    }
    messages.push(message);
    this.messages[message.type] = messages;

}

Game_Object.prototype.clearMessages = function() {
    this.messages = {};
}