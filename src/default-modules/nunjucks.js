const gulp = require("gulp");
const plumber = require("gulp-plumber");
const logger = require("../logger");
const { Command } = require("../command");
const fs = require("fs");
const watch = require("gulp-watch");

const prequire = require("parent-require");


module.exports.dependencies = [{name: "gulp-nunjucks-render", version: "^2.2.2"}];

module.exports.script = (config) => {
    mkDir(config.rootDir + "/pages");
    mkDir(config.rootDir + "/templates");

    copyTemplate(config.rootDir + "/pages/index.njk", "nunjucks-page-template.njk");
    copyTemplate(config.rootDir + "/templates/layout.njk", "nunjucks-layout-template.njk");
};

function copyTemplate(path, template) {
    if(!fs.existsSync(process.cwd() + "/" + path)){
        try {
            fs.createReadStream(__dirname + '/../../templates/' + template).pipe(fs.createWriteStream(process.cwd() + "/" + path));
        }catch (e) {
            logger.warn(e.message);
        }
    }
}

function mkDir(path){
    try {
        fs.mkdirSync(process.cwd() + "/" + path);
    }catch (e) {
        logger.warn(e.message);
    }
}

module.exports.commands = ({ pagesDir, templateDir }, config) => {

    const nunjucksRender = prequire("gulp-nunjucks-render");

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


    return [
        new Command(() =>  watch([pagesDir, templateDir + "/**/*.+(html|njk)"], function() {
            gulp.start('nunjucks');
        }), 100, ["watch"]),
        new Command(() => "nunjucks", 10, ["build"])];
};


