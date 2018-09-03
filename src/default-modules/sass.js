const { Command } = require("../command");
const sass = require("gulp-sass");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const logger = require("../logger");


module.exports = ({ sassDir }, config) => {

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

            .pipe(gulp.dest(config.cssDir));
    });

    return [new Command(() => {gulp.watch(sassDir, ['sass']);}, 100, ["watch"])];
};