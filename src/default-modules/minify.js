const { Command } = require("../command");

const prequire = require("parent-require");


module.exports.dependencies = [
    {name: "gulp-clean-css", version: "^3.10.0"},
    {name: "gulp-htmlmin", version: "^4.0.0"},
    {name: "gulp-minify", version: "^3.1.0"},
    {name: "gulp-rename", version: "^1.4.0"}];

module.exports.commands = ({ buildTasks, priority }) => {

    const minifyJS = prequire('gulp-minify');
    const minifyHTML = prequire('gulp-htmlmin');
    const cleanCSS = prequire('gulp-clean-css');
    const rename = prequire('gulp-rename');

    buildTasks = buildTasks || ['css', 'js', 'html'];
    priority = priority || 300;

    let commands = [];

    if(buildTasks.includes('js')){
        commands.push( new Command(() =>
                minifyJS({
                ext: {
                    min:'.min.js'
                },
                noSource: true,
                compress: {
                    sequences: false
                }
            }),
            priority, ["build-js"]));
    }
    if(buildTasks.includes('css')){
        commands.push( new Command(() => cleanCSS(), priority, ["build-css"]));
        commands.push(new Command(() => rename(function(file) {
            file.basename += ".min";
        }), 1000, ["build-css"]));
    }
    if(buildTasks.includes('html')){
        commands.push( new Command(() => minifyHTML({collapseWhitespace: true}), priority, ["build-html"]));
    }

    return commands;
};