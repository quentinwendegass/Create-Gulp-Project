const gulp = require("gulp");
const http = require("http");
const st = require("st");
const logger = require("../logger");

module.exports = ({port}, config) => {

    port = port || 3500;

    gulp.task('server', function(done) {

        http.createServer(
            st({ path: config.rootDir + "/" + config.distDir, index: 'index.html', cache: false })
        ).listen(port, done);

        logger.info("\nServer listening on localhost:" + port)
    });

    return []
};