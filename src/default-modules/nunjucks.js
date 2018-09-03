const gulp = require("gulp");
const plumber = require("gulp-plumber");
const nunjucksRender = require("gulp-nunjucks-render");
const logger = require("../logger");
const { Command } = require("../command");


module.exports = ({ pagesDir, templateDir }, config) => {

    pagesDir = pagesDir || "pages";
    pagesDir = config.rootDir + "/" + pagesDir + "/**/*.+(html|njk)";

    templateDir = templateDir || "templates";
    templateDir = config.rootDir + "/" + templateDir;

    gulp.task('nunjucks', () => {
        return gulp.src(pagesDir)
            .pipe(plumber({
                errorHandler: (err) => {
                    logger.error(err);
                }
            }))
            .pipe(nunjucksRender({
                path: [templateDir]
            }))
            .pipe(gulp.dest(config.rootDir + "/" + config.htmlDir));
    });


    return [new Command(() => {
        gulp.watch([pagesDir, templateDir + "/**/*.+(html|njk)"], ['nunjucks']);
    }, 100, ["watch"])];
};


