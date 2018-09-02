const os = require("os");
const m = require("../modules");

module.exports = (modules, name, author) => {

    let dependenciesString = "";

    if(modules){
        for(let i = 0; i < modules.length; i++){
            if(!(modules[i] in m)) {
                console.warn("Module does not exist: " + modules[i]);
                continue;
            }

            dependenciesString += m[modules[i]].dependencies;
        }
    }

    name = name || process.cwd().split(require('path').sep).pop();
    author = author || os.userInfo().username;

    return `{
  "name": "${name}",
  "version": "1.0.0",
  "main": "gulpfile.js",
  "dependencies": {
${dependenciesString}
    "del": "^3.0.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^5.0.0",
    "gulp-changed": "^3.2.0",
    "gulp-clean-css": "^3.9.4",
    "gulp-concat-flatten": "^0.2.1",
    "gulp-htmlmin": "^4.0.0",
    "gulp-imagemin": "^4.1.0",
    "gulp-livereload": "^3.8.1",
    "gulp-minify": "^3.1.0",
    "gulp-plumber": "^1.2.0",
    "gulp-rename": "^1.4.0",
    "gulp-sort": "^2.0.0",
    "gulp-util": "^3.0.8",
    "run-sequence": "^2.2.1"
  },
  "devDependencies": {},
  "scripts": {
  },
  "author": "${author}",
  "license": "ISC",
  "description": ""
}`
};