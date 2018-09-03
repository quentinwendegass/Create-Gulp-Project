const loader = require("../loader");
const logger = require("../logger");

module.exports = () => {

    const names = loader.loadAllModuleNames();

    logger.info("\nAll available modules");

    for (let i = 0; i < names.length; i++) {
        logger.info(`- ${names[i]}`);
    }

    logger.info("");
};
