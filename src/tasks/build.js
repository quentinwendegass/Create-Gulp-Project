const runSequence = require('run-sequence');

module.exports = function (done) {

    let taskNames = [];

    for(let i = 0; i < this.commands.length; i++){
        taskNames[i] = this.commands[i].cmd();
    }

    runSequence(taskNames, 'clear-dist',['build-css', 'build-js', 'build-html', 'move-res'], done);
};