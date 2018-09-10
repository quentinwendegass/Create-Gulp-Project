const logger = require("../logger");

module.exports = function () {
    const config = this.config;

    logger.info("\nModules in use:");
    for (let i = 0; i < config.modules.length; i++) {
        logger.info("- " + config.modules[i].name);
    }
    logger.info("");
};