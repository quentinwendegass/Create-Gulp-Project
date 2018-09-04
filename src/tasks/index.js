const fs = require("fs");
const gulp = require("gulp");
const loader = require("../loader");
const config = require("../config")();

module.exports = () => {

    const files = fs.readdirSync(__dirname);

    config.open();

    loader.loadModuleCommands(config.modules);

    for(let i = 0; i < files.length; i++){
        const file = files[i].replace(/\.js$/, "");

        if(file !== "index"){
            gulp.task(file, require("./" + file));
        }
    }

    return files;
};
