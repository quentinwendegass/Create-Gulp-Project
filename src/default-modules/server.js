const gulp = require("gulp");
const http = require("http");
const st = require("st");

module.exports = ({port}, config) => {

    port = port || 3500;

    gulp.task('server', function(done) {

        http.createServer(
            st({ path: config.distDir, index: 'index.html', cache: false })
        ).listen(port, done);
    });

    return []
};