const { Command } = require("../command");
const fs = require("fs");

const prequire = require("parent-require");

module.exports.dependencies = [
    {name: "gulp-jshint", version: "^2.1.0"},
    {name: "jshint", version: "^2.9.6"},
    {name: "jshint-stylish", version: "^2.2.1"}];

module.exports.script = (config) => {
    if(!fs.existsSync(process.cwd() + "/.jshintrc")){
        fs.writeFileSync(process.cwd() + "/.jshintrc", `{
  
}`);
    }
};

module.exports.commands = ({priority}) => {
    const jshint = prequire('gulp-jshint');
    const stylish = prequire('jshint-stylish');

    priority = priority || 40;

    return [
        new Command(() => jshint(), priority, ['build-js']),
        new Command(() => jshint.reporter(stylish), priority + 1, ['build-js'])
    ];
};