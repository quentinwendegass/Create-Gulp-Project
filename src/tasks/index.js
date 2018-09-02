const fs = require("fs");
const gulp = require("gulp");

module.exports = () => {

    const files = fs.readdirSync(__dirname);

    for(let i = 0; i < files.length; i++){
        const file = files[i].replace(/\.js$/, "");

        //TODO: Pass loaded modules as parameter
        gulp.task(file, require("./" + file)());
    }

    return files;
};
