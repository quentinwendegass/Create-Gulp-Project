const { Command } = require("../command");

const prequire = require("parent-require");


module.exports.dependencies = [{name: "gulp-imagemin", version: "^4.1.0"}];

module.exports.commands = () => {
    const imagemin = prequire('gulp-imagemin');

    return [new Command(() => imagemin(), 10, ["move-res"])];
};