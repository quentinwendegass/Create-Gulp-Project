const fs = require('fs');
const readline = require('readline-sync');
const os = require("os");

const m = require("./modules");
const defaultIndexPage = require('./templates/defaultIndexPage');
const defaultNunjucksLayout = require('./templates/defaultNunjucksLayout');
const defaultNunjucksPage = require('./templates/defaultNunjucksPage');
const createGulpfile = require('./templates/createGulpfile');
const createPackageJson = require('./templates/createPackageJson');

const timeString = () => {
    const d = new Date();
    return `[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}]`;

};

const log = val => console.info(`${timeString()} ${val}`);



if(process.argv.length > 4){
    console.error("To many arguments provided!");
    process.exit(1);
}

const args = process.argv.slice(2, 4);

if(args[0] === "init"){
    writeProject();

}else if(args[0] === "add"){
    addToProjectFile(args[1]);
}else if(args[0] === "remove"){
    removeFromProjectFile(args[1]);
}else{
    console.error(`Wrong arguments provided! "create-gulp-project ${args[0]} ${args[1]}"`)
}


function createDir(path){
    if(!fs.existsSync(path)){
        log("Creating directory: " + path);
        fs.mkdirSync(path);
        log("Directory successful created: " + path);
    }else{
        log("Creation of directory was skipped because it already exists!") ;
        log("Directory not created: " + path);
    }
}

function writeFile(path, data, override) {
    if(fs.existsSync(path) && !override){
        log("File already exists: " + path);
        const override = readline.question(`Do you want to override ${path}? (y/n)  `);

        if(override !== "y" && override !== "yes"){
            log("File not created: " + path);
            return;
        }
    }

    fs.writeFileSync(path, data, 'utf-8');
    log("File successfully created: " + path);
}

function getModulesFromProjectFile() {
    if(fs.existsSync("./.cgp")){
        const content = fs.readFileSync("./.cgp");

        const json = JSON.parse(content);

        if(json && "modules" in json){
            return json.modules;
        }
        log("Can not read modules in .cgp file! Run init to solve this problem.");
        return false;
    }
    log(".cgp file does not exist! Run init to solve this problem.");
    return false;
}

function getAuthorFromProjectFile() {
    if(fs.existsSync("./.cgp")){
        const content = fs.readFileSync("./.cgp");

        const json = JSON.parse(content);

        if(json && "author" in json){
            return json.author;
        }
        log("Can not read author property in .cgp file! Run init to solve this problem.");
        return "";
    }
    log(".cgp file does not exist! Run init to solve this problem.");
    return "";
}

function getNameFromProjectFile() {
    if(fs.existsSync("./.cgp")){
        const content = fs.readFileSync("./.cgp");

        const json = JSON.parse(content);

        if(json && "name" in json){
            return json.name;
        }
        log("Can not read name property in .cgp file! Run init to solve this problem.");
        return "";
    }
    log(".cgp file does not exist! Run init to solve this problem.");
    return "";
}


function removeFromProjectFile(module) {

    if(!(module in m)){
        log("Not a valid module: " + module);
        return;
    }

    let modules = getModulesFromProjectFile();

    for (let i = 0; i < modules.length; i++) {
        if (modules[i] === module) {
            modules.splice(i, 1);

            let data = JSON.stringify(modules);

            writeFile("./.cgp", `{"modules": ${data}, "author": "${getAuthorFromProjectFile()}", "name": "${getNameFromProjectFile()}"}`, true);
            log("Removed module successfully: " + module);
            updateProject(modules);
            return;
        }
    }
    log("Module not found in .cgp file: " + module);
}

function addToProjectFile(module) {
    if(!(module in m)){
        log("Not a valid module: " + module);
        return;
    }

    let modules = getModulesFromProjectFile();

    for(let i = 0; i < modules.length ; i++){
        if(modules[i] === module){
            log("Module is already in use: " + module);
            return;
        }
    }

    modules.push(module);

    let data = JSON.stringify(modules);

    writeFile("./.cgp", `{"modules": ${data}, "author": "${getAuthorFromProjectFile()}", "name": "${getNameFromProjectFile()}"}`, true);
    log("Added module successfully: " + module);

    switch (module) {
        case "nunjucks":
            createNunjucksResources();
            break;
        case "sass":
            createSassRessources();
            break;
    }

    updateProject(modules);
}


function updateProject(modules) {
    writeFile("./gulpfile.js", createGulpfile(modules), true);
    writeFile("./package.json", createPackageJson(modules, getNameFromProjectFile(), getAuthorFromProjectFile()), true);
    log("Modules successfully updated!");
    log('Run "npm install" to install all dependencies!')
}

function writeProject() {
    let modules = getModulesFromProjectFile();

    if(modules){
        createProjectResources(true);

        if("nunjucks" in modules) createNunjucksResources();
        if("sass" in modules) createSassRessources();

        updateProject(modules);
        return;
    }

    createProjectResources(false);

    log("Create new .cgp file...");

    let name = readline.question(`Please type in your project-name:  `);
    let author = readline.question('Please type in your name:  ');

    const content = `
    {
       "modules": [],
       "author": "${author || os.userInfo().username}",
       "name": "${name || process.cwd().split(require('path').sep).pop()}"
    }
    `;

    fs.writeFileSync("./.cgp", content, 'utf-8');
    log(".cgp file successfully created!");

    log("Initializing project finished!")
}


function createNunjucksResources() {
    log("Start creating directory structure for nunjucks...");

    createDir('./app/pages');
    createDir('./app/templates');
    createDir('./app/templates/macros');
    createDir('./app/templates/partials');

    writeFile('./app/templates/layout.njk', defaultNunjucksLayout);
    writeFile('./app/pages/index.njk', defaultNunjucksPage);

    log("Finished creating directory structure!");
}

function createSassRessources() {
    log("Start creating directory structure for sass...");

    createDir('./app/sass');

    log("Finished creating directory structure!");
}

function createProjectResources(initialized){
    log("Start creating directory structure...");

    createDir('./app');
    createDir('./app/js');
    createDir('./app/css');
    createDir('./app/res');

    log("Finished creating directory structure!");

    log("Start writing files...");

    if(!initialized){
        writeFile('./app/index.html', defaultIndexPage);
        writeFile('./gulpfile.js', createGulpfile());
        writeFile('./package.json', createPackageJson());
    }

    log("Finished writing files!");
}
