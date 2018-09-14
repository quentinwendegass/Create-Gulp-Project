const utils = require("../utils");
const logger = require("../logger");
const loader = require("../loader");

module.exports = function () {

    const config = this.config;
    const modules = utils.getArgsFor("add");

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
            logger.warn(`Module with name "${module}" was not found! Adding is skipped.`);
            continue;
        }

        if (config.includesModule(module)) {
            logger.warn(`Module with name "${module}" is already installed! Adding is skipped.`);
            continue;
        }

        config.modules.push({
            name: module,
            options: {}
        });
        success.push(module);

        loader.invokeModuleScript(module, config);
        loader.addModuleDependencies(module, config);
    }

    config.write();

    logger.info(`\nAdded ${success.length} modules!`);
    for (let i = 0; i < success.length; i++) {
        logger.info(`+ ${success[i]}`);
    }
    logger.info("\nRun npm install to get the dependencies!\n");
};

