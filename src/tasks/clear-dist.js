const del = require("del");

module.exports = function () {
    return del([this.config.rootDir + "/" + this.config.distDir + "/**/*"]);
};
