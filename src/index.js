const loadTasks = require("./tasks/index");
const conf = require("./config");
const logger = require("./logger");

module.exports = () => {

    if(!(process.argv.slice(0, 3).includes("init"))){
        loadTasks();
        return;
    }

    const config = conf();

    logger.info("Creating new cpgfile.json...");
    config.modules = [
        {
            name: "minify",
            options: {}
        },
        {
            name: "autoprefixer",
            options: {}
        }];
    config.rootDir = "app";
    config.htmlDir = "./";
    config.jsDir = "js";
    config.cssDir = "css";
    config.resDir = "res";
    config.distDir = "dist";
    config.external = [];

    config.write();
    logger.info("gpgfile.json successfully created!");
    process.exit(0);
};