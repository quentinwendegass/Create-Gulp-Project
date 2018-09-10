const fs = require("fs");
const logger = require("./logger");

const configurationPath = process.cwd() + "/cgpfile.json";


function setProperty(name, self, config, defaultValue, noWarn) {
    if (!config[name]) {
        if (!noWarn) logger.warn(`Property "${name}" is not in your cgpfile!`);
        self[name] = defaultValue;
        return;
    }

    self[name] = config[name];
}


function ConfigPrototype (isOpen) {

    this.isOpen = isOpen;

    this.open = function () {

        if (!fs.existsSync(configurationPath)) {
            logger.error("No config file in current directory! Please run \"gulp init\".");
            process.exit(1);
        }

        let content = fs.readFileSync(configurationPath);

        let config = JSON.parse(content);

        if (config) {
            setProperty("rootDir", this, config, "app");
            setProperty("htmlDir", this, config, "html");
            setProperty("cssDir", this, config, "css");
            setProperty("jsDir", this, config, "js");
            setProperty("resDir", this, config, "res");
            setProperty("distDir", this, config, "dist");
            setProperty("modules", this, config, []);
            setProperty("external", this, config, [], true);

            Object.setPrototypeOf(this, new ConfigPrototype(true));
            return;
        }

        logger.error("Not a valid configuration!");
        process.exit(1);
    };

    this.write = function () {

        if (fs.existsSync(configurationPath) && !this.isOpen) {
            logger.error("cgpfile already exists!");
            logger.error("Internal error! Config file must be opened before it can be written.");
            process.exit(1);
        }


        let content = JSON.stringify(this, null, 2);

        fs.writeFileSync(configurationPath, content);
        logger.info("Config file updated!");
    };

    this.includesModule = function (module) {
        if(!this.isOpen){
            logger.error("Internal error! Config file must be opened before modules can be accessed.");
            process.exit(1);
        }

        for(let i = 0; i < this.modules.length; i++){
            if(this.modules[i].name === module){
                return true;
            }
        }

        return false;
    };
}


module.exports = () => {
    return Object.create(new ConfigPrototype());
};


