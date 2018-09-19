const fs = require("fs");
const gulp = require("gulp");
const loader = require("../loader");
const config = require("../config")();
const utils = require("../utils");

module.exports = () => {

    const files = fs.readdirSync(__dirname);

    config.open();


    const task = utils.getTaskArg();

    if(/add|remove|list|list-all/.test(task)){
        loader.loadModuleCommands();
    }else{
        loader.loadModuleCommands(config.modules);
    }

    for(let i = 0; i < files.length; i++){
        const file = files[i].replace(/\.js$/, "");

        if(file !== "index"){
            gulp.task(file, require("./" + file));
        }
    }

    return files;
};
