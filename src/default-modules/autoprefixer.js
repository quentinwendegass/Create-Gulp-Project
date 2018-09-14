const { Command} = require("../command");

const prequire = require("parent-require");


module.exports.dependencies = [{name: "gulp-autoprefixer", version: "^6.0.0"}];

module.exports.commands = () => {
    const autoprefixer = prequire('gulp-autoprefixer');

    return [new Command(() => autoprefixer(), 10, ['build-css'])];
};