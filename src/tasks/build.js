const runSequence = require('run-sequence');

module.exports = function (done) {

    let taskNames = [];

    for(let i = 0; i < this.commands.length; i++){
        taskNames[i] = this.commands[i].cmd();
    }

    if(taskNames.length > 0){
        runSequence(taskNames, 'clear-dist',['build-css', 'build-js', 'build-html', 'move-res'], done);

    }else{
        runSequence('clear-dist',['build-css', 'build-js', 'build-html', 'move-res'], done);
    }
};