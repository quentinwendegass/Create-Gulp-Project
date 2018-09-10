#! /usr/bin/env node

const readline = require("readline-sync");
const config = require("./src/config")();
const logger = require("./src/logger");
const fs = require("fs");


console.log(process.cwd() + "/cgpfile.json");
if(fs.existsSync(process.cwd() + "/cgpfile.json")){
    console.error("There is already a cgpfile.json in this directory!");
    process.exit(1);
}

if(fs.existsSync(process.cwd() + "/gulpfile.js")){
    console.error("There is already a gulpfile.js in this directory!");
    process.exit(1);
}

let appName, author;
if(!fs.existsSync(process.cwd() + "/package.json")){
     appName = readline.question(`\nEnter Application Name: ("app-name"):\n`);
     author = readline.question(`\nEnter Your Name: ("John Doe"):\n`);

     appName = appName || "app-name";
     author = author || "John Doe";
}

const rootDir = readline.question(`\nEnter Root directory: ("./app"):\n`);
const jsDir = readline.question(`\nEnter Javascript directory relative to Root directory: ("./js"):\n`);
const htmlDir = readline.question(`\nEnter Html directory relative to Root directory: ("./"):\n`);
const cssDir = readline.question(`\nEnter Css directory relative to Root directory: ("./css"):\n`);
const resDir = readline.question(`\nEnter Resources directory relative to Root directory: ("./res"):\n`);
const distDir = readline.question(`\nEnter Build directory relative to Root directory: ("./dist"):\n`);

logger.info("\nCreate cgpfile.json...");

config.rootDir = rootDir || "./app";
config.jsDir = jsDir || "./js";
config.htmlDir = htmlDir || "./";
config.cssDir = cssDir || "./css";
config.resDir = resDir || "./res";
config.distDir = distDir || "./dist";
config.modules = [
        {
            name: "minify",
            options: {
                buildTasks: ["css", "js", "html"]
            }
        },
        {
            name: "imagemin",
        },
        {
            name: "autoprefixer"
        }
    ];

config.write();

logger.info("Finished creating cgpfile.json!");

let data;
if(!appName){
    let content = fs.readFileSync(process.cwd() + "/package.json");
    data = JSON.parse(content);
}else{
    logger.info("\nNo package.json found! Creating a new one...");
    data = {
        name: appName,
        version: "1.0.0",
        main: "gulpfile.js",
        dependencies: {},
        devDependencies: {},
        license: "ISC",
        author: author
    };
}

const cgpPackage = require("./package.json");
data.dependencies["create-gulp-project"] = cgpPackage.version;

fs.writeFileSync(process.cwd() + "/package.json", JSON.stringify(data, null, 2));
fs.writeFileSync(process.cwd() + "/gulpfile.js", "require(\"create-gulp-project\")();\n");

logger.info("Create directory structure...");

mkDir(config.rootDir);
mkDir(config.rootDir + "/" + config.jsDir);
mkDir(config.rootDir + "/" + config.cssDir);
mkDir(config.rootDir + "/" + config.htmlDir);
mkDir(config.rootDir + "/" + config.resDir);
mkDir(config.rootDir + "/" + config.distDir);

if(!fs.existsSync(process.cwd() + "/" + rootDir + "/index.html")){
    fs.createReadStream(__dirname + '/templates/html-template.html').pipe(fs.createWriteStream(process.cwd() + "/" + config.rootDir + "/index.html"));
}

if(!fs.existsSync(process.cwd() + "/.gitignore")){
    fs.writeFileSync(process.cwd() + "/.gitignore", "node_modules/");
}

console.info("Initialization completed!");
console.info(`Run "npm i" to update the packages!`);

function mkDir(path) {
    try{
        fs.mkdirSync(process.cwd() + "/" + path);
    }catch (e) {
    }
}
