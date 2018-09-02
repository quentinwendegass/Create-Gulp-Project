module.exports.Command = function (cmd, priority, buildTasks) {
    this.cmd = cmd;
    this.buildTasks = buildTasks;
    this.priority = priority;
};

module.exports.Module = function (commands, watch) {
    this.commands = commands || [];
    this.watch = watch || function () {};
};