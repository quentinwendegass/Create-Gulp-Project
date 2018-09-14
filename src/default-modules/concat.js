const {  Command } = require("../command");

const prequire = require("parent-require");


module.exports.dependencies = [
    {name: "gulp-concat-flatten", version: "^0.2.1"},
    {name: "gulp-order", version: "^1.1.1"},
    {name: "gulp-rename", version: "^1.4.0"}];

module.exports.commands = ({ buildTasks, priority, order }, config) => {

    const gulpOrder = prequire('gulp-order');
    const concat = prequire("gulp-concat-flatten");
    const rename = prequire('gulp-rename');

    buildTasks = buildTasks || ['css', 'js'];
    priority = priority || 100;
    order = order || [];

    let commands = [];


    if(buildTasks.includes("css")){
        commands.push(new Command(() => gulpOrder(order.concat(["**/*.css"])), priority, ["build-css"]));
        commands.push(new Command(() => concat(config.rootDir + "/" + config.cssDir + '/**', 'css', {'newLine': '\n'}), priority + 1, ["build-css"]));
        commands.push(new Command(() => rename(function(file) {
            file.dirname = "";
        }), priority + 2, ["build-css"]));
    }
    if(buildTasks.includes("js")){
        commands.push(new Command(() => gulpOrder(order.concat(["**/*.js"])), priority, ["build-js"]));
        commands.push(new Command(() => concat(config.rootDir + "/" + config.jsDir + '/**', 'js', {'newLine': '\n'}), priority + 1, ["build-js"]));
        commands.push(new Command(() => rename(function(file) {
            file.dirname = "";
        }), priority + 2, ["build-js"]));
    }

    return commands;
};