const { Command } = require("../command");
const sass = require("gulp-sass");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const logger = require("../logger");
const fs = require("fs");
const watch = require("gulp-watch");


module.exports.script = (config) => {
    try {
        fs.mkdirSync(process.cwd() + "/" + config.rootDir + "/sass");
    }catch (e) {
        logger.warn(e.message);
    }
};

module.exports.commands = ({ sassDir }, config) => {

    sassDir = sassDir || 'sass';
    sassDir = config.rootDir + "/" + sassDir + "/**/*.scss";

    gulp.task('sass', function () {
        return gulp.src(sassDir)

            .pipe(plumber({
                errorHandler: (err) => {
                    logger.error(err);
                }
            }))

            .pipe(sass({
                errLogToConsole: true,
                outputStyle: 'expanded'
            }   ).on('error', sass.logError))

            .pipe(gulp.dest(config.rootDir + "/" + config.cssDir));
    });

    return [
        new Command(() =>  watch(sassDir, function() {
            gulp.start('sass');
        }), 100, ["watch"]),
        new Command(() => "sass", 10, ["build"])];
};