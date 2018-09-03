const gulp = require("gulp");

module.exports = function () {
    gulp.watch(this.config.rootDir + "/" + this.config.cssDir + "/**/*.css", ["build-css"]);
    gulp.watch(this.config.rootDir + "/" + this.config.htmlDir + "/**/*.html", ["build-html"]);
    gulp.watch(this.config.rootDir + "/" + this.config.jsDir + "/**/*.js", ["build-js"]);
    gulp.watch(this.config.rootDir + "/" + this.config.resDir + "/**/*.css", ["build-css"]);

    for (let i = 0; i < this.commands.length; i++) {
        this.commands[i].cmd();
    }
};