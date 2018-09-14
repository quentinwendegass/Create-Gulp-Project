const gulp = require("gulp");
const http = require("http");
const logger = require("../logger");

const prequire = require("parent-require");


module.exports.dependencies = [{name: "st", version: "^1.2.2"}];

module.exports.commands = ({port}, config) => {

    const st = prequire("st");

    port = port || 3500;

    gulp.task('server', function(done) {

        http.createServer(
            st({ path: config.rootDir + "/" + config.distDir, index: 'index.html', cache: false })
        ).listen(port, done);

        logger.info("\nServer listening on localhost:" + port + "\n");
    });

    return [];
};