const { Command } = require("../command");

const prequire = require("parent-require");
const imagemin = prequire('gulp-imagemin');


module.exports.dependencies = [{name: "gulp-imagemin", version: "^4.1.0"}];

module.exports.commands = () => {
    return [new Command(() => imagemin(), 10, ["move-res"])];
};