const logger = require("./logger");

module.exports.getArgsFor = task => {
    let args = [];
    for(let i = process.argv.findIndex(v => v === task) + 1; i < process.argv.length; i++){
        if(process.argv[i].startsWith("-")){
            args.push(process.argv[i].substring(1));
        }else{
            logger.warn(`"${process.argv[i]}" is not a valid argument and will not be processed!`);
        }
    }

    return args;
};

module.exports.getTaskArg = () => {
    let taskIndex = process.argv.findIndex(v => v.endsWith("gulp")) + 1;
    return process.argv[taskIndex];
};
