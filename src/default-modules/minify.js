const { Command } = require("../command");
const minifyJS = require('gulp-minify');
const minifyHTML = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');


module.exports.commands = ({ buildTasks, priority }) => {

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