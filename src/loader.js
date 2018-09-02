const config = require("./config")();
const fs = require("fs");

module.exports.loadModules = (modules) => {
  //TODO
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