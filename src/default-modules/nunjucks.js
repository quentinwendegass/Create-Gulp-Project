const gulp = require("gulp");
const config = require("../config")();
const plumber = require("gulp-plumber");
const nunjucksRender = require("gulp-nunjucks-render");
const logger = require("../logger");
const { Module } = require("../module");


module.exports = ({ pagesDir, templateDir, destDir }) => {

    config.open();

    pagesDir = pagesDir || "pages";
    pagesDir = config.rootDir + "/" + pagesDir + "/**/*.+(html|njk)";

    templateDir = templateDir || "templates";
    templateDir = config.htmlDir + "/" + templateDir + "/**/*.+(html|njk)";

    destDir = destDir || config.rootDir;
    destDir = config.rootDir + "/" + destDir;


    gulp.task('nunjucks', () => {
        return gulp.src(pagesDir)
            .pipe(plumber({
                errorHandler: (err) => {
                    logger.error(err);
                }
            }))
            .pipe(nunjucksRender({
                path: ['app/templates']
            }))
            .pipe(gulp.dest(destDir));
    });


    return new Module(null, () => {
        gulp.watch([pagesDir, templateDir], ['nunjucks']);
    });
};


