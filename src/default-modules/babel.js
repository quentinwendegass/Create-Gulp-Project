const { Command } = require("../command");
const fs = require("fs");

const prequire = require("parent-require");

module.exports.dependencies = [
    {name: "gulp-babel", version: "^8.0.0"},
    {name: "@babel/core", version: "^7.0.0"},
    {name: "@babel/preset-env", version: "^7.0.0"}];

module.exports.script = (config) => {
    if(!fs.existsSync(process.cwd() + "/.babelrc")){
        fs.writeFileSync(process.cwd() + "/.babelrc", `{
  "presets": ["@babel/env"]
}`);
    }

};

module.exports.commands = () => {
    const babel = prequire('gulp-babel');

    return [new Command(() => babel(), 50, ['build-js'])];
};