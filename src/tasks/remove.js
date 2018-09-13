const utils = require("../utils");
const logger = require("../logger");
const loader = require("../loader");


module.exports = function () {

    const modules = utils.getArgsFor("remove");
    const config = this.config;

    if (modules.length === 0) {
        logger.error("No module name specified! Try with \"gulp add -name\"");
        process.exit(1);
    }

    const availableModules = loader.loadAllModuleNames();

    let success = [];

    logger.warn("");

    for (let i = 0; i < modules.length; i++) {
        let module = modules[i];
        if (!availableModules.includes(module)) {
            logger.warn(`Module with name "${module}" was not found! Removing is skipped.`);
            continue;
        }

        if (!config.includesModule(module)) {
            logger.warn(`Module with name "${module}" is not installed! Removing is skipped.`);
            continue;
        }

        for (let i = 0; i < config.modules.length; i++) {
            if (config.modules[i].name === module) {
                config.modules.splice(i, 1);
                success.push(module);
                loader.removeModuleDependencies(module, config);
                break;
            }
        }
    }

    config.write();

    logger.info(`\nRemoved ${success.length} modules!`);
    for (let i = 0; i < success.length; i++) {
        logger.info(`- ${success[i]}`);
    }
    logger.info("");
};