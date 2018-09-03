const { Command} = require("../command");
const autoprefixer = require('gulp-autoprefixer');


module.exports = () => {

    return [new Command(() => autoprefixer(), 10, ['build-css'])];
};