module.exports.Command = function (cmd, priority, buildTasks) {
    this.cmd = cmd;
    this.tasks = buildTasks;
    this.priority = priority;
};
