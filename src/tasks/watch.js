const gulp = require("gulp");
const livereload = require("gulp-livereload");
const watch = require("gulp-watch");

module.exports = function () {
    livereload.listen();

    const rootDir = this.config.rootDir;

    watch(rootDir + "/" + this.config.cssDir + "/**/*.css", function() {
        gulp.start('build-css');
    });

    watch(rootDir + "/" + this.config.jsDir + "/**/*.js", function() {
        gulp.start('build-js');
    });

    watch([rootDir + "/" + this.config.htmlDir + "/**/*.html", "!" + rootDir + "/" + this.config.distDir + "/**/*"], function() {
        gulp.start('build-html');
    });

    watch(rootDir + "/" + this.config.resDir + "/**/*", function() {
        gulp.start('move-res');
    });

    for (let i = 0; i < this.commands.length; i++) {
        this.commands[i].cmd();
    }
};