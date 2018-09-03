const { Command } = require("../command");
const imagemin = require('gulp-imagemin');


module.exports = () => {
    return [new Command(() => imagemin(), 10, ["move-res"])];
};