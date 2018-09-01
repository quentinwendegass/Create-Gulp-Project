const gulp 				= require('gulp');
const data 				= require('gulp-data');
const sass 				= require('gulp-sass');
const autoprefixer 		= require('gulp-autoprefixer');
const nunjucksRender 	= require('gulp-nunjucks-render');
const minifyJS 			= require('gulp-minify');
const minifyHTML 		= require('gulp-htmlmin');
const cleanCSS 			= require('gulp-clean-css');
const concat 			= require('gulp-concat-flatten');
const livereload 		= require('gulp-livereload');
const http 				= require('http');
const st 				= require('st');
const plumber 			= require('gulp-plumber');
const gutil 			= require('gulp-util');
const sort    		    = require('gulp-sort');


const config = {
    njkDir: 'app/pages',
    njkPattern: '**/*.+(html|njk)',
    htmlPattern: '*.html',
    sassDir: 'app/sass',
    cssDir: 'app/css',
    cssPattern: '**/*.css',
    sassPattern: '**/*.scss',
    distDir: 'app/dist',
    jsDir: 'app/js',
    jsPattern: '**/*.js'
	rootDir: 'app'
};

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

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
	
	// Autocompile Nunjucks TODO
    // gulp.watch(config.njkDir + '/' + config.njkPattern, ['nunjucks']);
	
	// Autocompile Sass
    gulp.watch(config.sassDir + '/' + config.sassPattern, ['sass']);
	
	// Automatic Build js
    gulp.watch(config.jsDir + '/' + config.jsPattern, ['build-js']);
	
	// Automatic Build css
    gulp.watch(config.cssDir + '/' + config.cssPattern, ['build-css']);
	
	// Automatic Build html
    gulp.watch(config.rootDir, ['build-html']);

});


gulp.task('sass', function () {
    return gulp.src(config.sassDir + '/' + config.sassPattern)
	
		// Error Handler
    	.pipe(plumber({
     	   errorHandler: onError
    	}))
		
		// Sass compiler Optional
        .pipe(sass(sassOptions).on('error', sass.logError))
		
		// Write to css directory
        .pipe(gulp.dest(config.cssDir));
});


gulp.task('nunjucks', function() {
    return gulp.src(config.njkDir + '/' + config.njkPattern)
	
		// Error Handler
    	.pipe(plumber({
      	  	errorHandler: onError
    	}))
		
		// Render Nunjucks Optional
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
		
		// Write to Root
        .pipe(gulp.dest(config.rootDir));
});


gulp.task('server', function(done) {
	
	// Start Dev-Server
    http.createServer(
        st({ path: config.distDir, index: 'index.html', cache: false })
    ).listen(8080, done);
});


gulp.task('build', ['build-css', 'build-js', 'build-html']);


gulp.task('build-css', function()){
	
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
	.concat(config.cssDir, 'css', {'newLine': '\n'})
	
	// Minify Option
    .pipe(cleanCSS())
	
	// Write to build folder
	.pipe(gulp.dest(config.distDir + '/css'));
	
	// Livereload Optional
	.pipe(livereload());
};


gulp.task('build-js', function()){
	
	// Get js folders
	return gulp.src(config.jsDir + '/' + config.jsPattern)
	
	// Error Handler
    .pipe(plumber({
      errorHandler: onError
    }))
	
	// Concat Option
	.pipe(sort())
	.concat(config.jsDir, 'js', {'newLine': '\n'})
	
	// Minify Option
	.pipe(minifyJS())
	
	// Write to build folder
	.pipe(gulp.dest(config.distDir + '/js'));
	
	// Livereload Optional
	.pipe(livereload());
};


gulp.task('build-html', function()){
	
	// Get root folders
	return gulp.src(config.rootDir + '/' + config.htmlPattern)
	
	// Error Handler
    .pipe(plumber({
      errorHandler: onError
    }))
	
	// Minify Option
	.pipe(minifyHTML({collapseWhitespace: true}))
	
	// Write to build folder
	.pipe(gulp.dest(config.distDir));
	
	// Livereload Optional
	.pipe(livereload());
};