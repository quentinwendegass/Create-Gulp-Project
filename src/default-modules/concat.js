const {  Command } = require("../command");
const concat = require('gulp-concat-flatten');
const sort = require('gulp-sort');
const rename = require('gulp-rename');


module.exports = ({ buildTasks, priority }, config) => {

    buildTasks = buildTasks || ['css', 'js'];
    priority = priority || 100;

    let commands = [];

    if(buildTasks.includes("css")){
        commands.push(new Command(() => sort(), priority, ["build-css"]));
        commands.push(new Command(() => concat(config.rootDir + "/" + config.cssDir + '/**', 'css', {'newLine': '\n'}), priority + 1, ["build-css"]));
        commands.push(new Command(() => rename(function(file) {
            file.dirname = "";
        }), priority + 2, ["build-css"]));
    }
    if(buildTasks.includes("js")){
        commands.push(new Command(() => sort(), priority, ["build-js"]));
        commands.push(new Command(() => concat(config.rootDir + "/" + config.jsDir + '/**', 'js', {'newLine': '\n'}), priority + 1, ["build-js"]));
        commands.push(new Command(() => rename(function(file) {
            file.dirname = "";
        }), priority + 2, ["build-js"]));
    }

    return commands;
};