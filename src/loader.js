const config = require("./config")();
const fs = require("fs");
const logger = require("./logger");
const gulp = require("gulp");



module.exports.invokeModuleScript = (module, config) => {
    let paths = [__dirname.concat("/default-modules")];


    if(config.external){
        paths = paths.concat(config.external);
    }

    for(let i = 0; i < paths.length; i++){
        let files = fs.readdirSync(paths[i]);

        if(files.includes(module + ".js")){
            let m = require(paths[i] + "/" + module);
            if(m.script){
                m.script(config);
                logger.log(`Invoked script successfully on module "${module}"!`);
            }
            break;
        }
    }
};

module.exports.loadModuleCommands = (mods) => {
    let paths = [__dirname.concat("/default-modules")];

    config.open();

    if(config.external){
        paths = paths.concat(config.external);
    }

    let commands = [];


    for(let i = 0; i < paths.length; i++){
        let files = fs.readdirSync(paths[i]);

        for(let j = 0; j < mods.length; j++){
            if(files.includes(mods[j].name + ".js")){
                commands = commands.concat(require(paths[i] + "/" + mods[j].name).commands(mods[j].options, config));
                logger.log(`Module "${mods[j].name}" successfully loaded.`);
            }
        }
    }

    let modCommands = {};

    for(let i = 0; i < commands.length; i++){

        let tasks = commands[i].tasks;
        for(let j = 0; j < tasks.length; j++){
            if(modCommands[tasks[j]]){
                modCommands[tasks[j]].push(commands[i]);
                continue;
            }
            modCommands[tasks[j]] = [commands[i]];
        }
    }

    const compare = (a,b) => {
        if (a.priority < b.priority)
            return -1;
        if (a.priority > b.priority)
            return 1;
        return 0;
    };

    for (let key in modCommands) {
        if (modCommands.hasOwnProperty(key)) {
            modCommands[key].sort(compare);
        }
    }


    let _runTask = gulp.Gulp.prototype._runTask;

    gulp.Gulp.prototype._runTask = function (task) {
        this.commands = modCommands[task.name] || [];
        this.config = config;

        _runTask.apply(this, arguments);
    };
};


module.exports.loadAllModuleNames = () => {

    let defaultPath = __dirname.concat("/default-modules");

    config.open();
    let externalModules = config.external;

    let files = fs.readdirSync(defaultPath);

    for(let i = 0; i < externalModules.length; i++){
        files = files.concat(fs.readdirSync(externalModules[i]));
    }

    for(let i = 0; i < files.length; i++){
        files[i] = files[i].replace(/\.js$/, "");
    }

    return files;
};