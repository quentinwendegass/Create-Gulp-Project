const runSequence = require('run-sequence');

module.exports = () => {
    return done => {
        runSequence('clear-dist',['build-css', 'build-js', 'build-html', 'move-res'], done);
    }
};