const config = require("../config")();
const logger = require("../logger");

module.exports = () => {
    return () => {
        config.open();

        logger.info("\nModules in use:");
        for(let i = 0; i < conf.modules.length; i++){
            logger.info("- " + conf.modules[i].name);
        }
        logger.info("")
    };
};