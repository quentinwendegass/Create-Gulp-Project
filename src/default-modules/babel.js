const { Command } = require("../command");
const babel = require('gulp-babel');
const fs = require("fs");

module.exports.script = (config) => {
    if(!fs.existsSync(process.cwd() + "/.babelrc")){
        fs.writeFileSync(process.cwd() + "/.babelrc", `{
  "presets": ["@babel/env"]
}`)
    }

};

module.exports.commands = () => {
    return [new Command(() => babel(), 50, ['build-js'])];
};