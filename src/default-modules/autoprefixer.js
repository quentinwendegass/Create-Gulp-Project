const { Command} = require("../command");

const prequire = require("parent-require");
const autoprefixer = prequire('gulp-autoprefixer');


module.exports.dependencies = [{name: "gulp-autoprefixer", version: "^6.0.0"}];

module.exports.commands = () => {
    return [new Command(() => autoprefixer(), 10, ['build-css'])];
};