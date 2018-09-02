const m = require("../modules")

module.exports = (modules) => {

    let importString = "";
    let taskString = "";
    let watchString = "";
    let optionsString = "";
    let configString = "";

    if(modules){
        for(let i = 0; i < modules.length; i++){
            if(!(modules[i] in m)) {
                console.warn("Module does not exist: " + modules[i]);
                continue;
            }

            importString += m[modules[i]].imports;
            taskString += m[modules[i]].task;
            watchString += m[modules[i]].watch;
            optionsString += m[modules[i]].options;
            configString += m[modules[i]].config;
        }
    }

    return `const gulp 				= require('gulp');
const autoprefixer 		= require('gulp-autoprefixer');
const minifyJS 			= require('gulp-minify');
const minifyHTML 		= require('gulp-htmlmin');
const cleanCSS 			= require('gulp-clean-css');
const concat 			= require('gulp-concat-flatten');
const livereload 		= require('gulp-livereload');
const plumber 			= require('gulp-plumber');
const gutil 			= require('gulp-util');
const sort    		    = require('gulp-sort');
const rename            = require('gulp-rename');
const path              = require('path');
const imagemin          = require('gulp-imagemin');
const changed           = require('gulp-changed');
const del               = require('del');
const runSequence       = require('run-sequence');
${importString}




const config = {
    ${configString}
    htmlPattern: '**/*.html',
    cssDir: 'app/css',
    cssPattern: '**/*.css',
    distDir: 'app/dist',
    jsDir: 'app/js',
    jsPattern: '**/*.js',
    rootDir: 'app',
    resDir: 'app/res/**/*',
    imgPattern: '**/*.+(png|jpeg)'
};

${optionsString}

const onError = function (err) {
    gutil.beep();
    console.log(err);
};



//
// Gulp Tasks
//

gulp.task('watch', function() {

    // Listen Livereload
    livereload.listen();

${watchString}
    // Automatic Build js
    gulp.watch(config.jsDir + '/' + config.jsPattern, ['build-js']);

    // Automatic Build css
    gulp.watch(config.cssDir + '/' + config.cssPattern, ['build-css']);

    // Automatic Build html
    gulp.watch(config.rootDir + '/' + config.htmlPattern, ['build-html']);

    // Copy resources and optimize images
    gulp.watch(config.resDir, ['move-res']);
});


${taskString}
gulp.task('build', function (done) {
    runSequence('clear-dist',['build-css', 'build-js', 'build-html', 'move-res'], done);
});


gulp.task('build-css', function(){

    // Get css folders
    return gulp.src(config.cssDir + '/' + config.cssPattern)

    // Error Handler
        .pipe(plumber({
            errorHandler: onError
        }))

        // Autoprefix
        .pipe(autoprefixer())

        // Concat Option
        .pipe(sort())
        .pipe(concat(config.cssDir + '/**', 'css', {'newLine': '\\n'}))

        // Minify Option
        .pipe(cleanCSS())


        // Write to build folder
        .pipe(rename(function(file) {
            file.dirname = file.dirname.split(path.sep)[1];
            file.basename += ".min";
        }))

        .pipe(gulp.dest(config.distDir))

        // Livereload Optional
        .pipe(livereload());
});

gulp.task('build-js', function(){
    console.log(concat);
    // Get js folders
    return gulp.src(config.jsDir + '/' + config.jsPattern)

    // Error Handler
        .pipe(plumber({
            errorHandler: onError
        }))

        // Concat Option
        .pipe(sort())
        .pipe(concat(config.jsDir + '/**', 'js', {'newLine': '\\n'}))

        // Minify Option
        .pipe(minifyJS({
            ext: {
                min:'.min.js'
            },
            noSource: true,
            compress: {
                sequences: false
            }
        }))

        // Write to build folder
        .pipe(rename(function(file) {
            file.dirname = file.dirname.split(path.sep)[1];
        }))
        .pipe(gulp.dest(config.distDir))

        // Livereload Optional
        .pipe(livereload());
});


gulp.task('build-html', function(){

    // Get root folders
    return gulp.src([config.rootDir + '/' + config.htmlPattern, '!' + config.distDir + '/' + config.htmlPattern])

    // Error Handler
        .pipe(plumber({
            errorHandler: onError
        }))

        // Minify Option
        .pipe(minifyHTML({collapseWhitespace: true}))

        // Write to build folder
        .pipe(gulp.dest(config.distDir))

        // Livereload Optional
        .pipe(livereload());
});


gulp.task('move-res', function(){

    // Get res folder
    return gulp.src(config.resDir)

        .pipe(changed(config.distDir + '/res'))

        // Error Handler
        .pipe(plumber({
            errorHandler: onError
        }))

        // Optimize Images
        .pipe(imagemin())

        // Write to build folder
        .pipe(gulp.dest(config.distDir + '/res'))

        // Livereload Optional
        .pipe(livereload());
});


gulp.task('clear-dist', function () {
    return del([config.distDir + "/**/*"]);
});`;
};