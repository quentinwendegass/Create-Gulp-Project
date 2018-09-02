let server = {
    "imports": `const http 				= require('http');
const st 				= require('st');
`,
    "task": `gulp.task('server', function(done) {
	
	// Start Dev-Server
    http.createServer(
        st({ path: config.distDir, index: 'index.html', cache: false })
    ).listen(8070, done);
});

`,
    "config": ``,
    "options": ``,
    'watch': ``,
    "dependencies": `    "http": "0.0.0",
    "st": "^1.2.2",
    `
};

let nunjucks = {
    "imports": `const nunjucksRender 	= require('gulp-nunjucks-render');
    `,
    "task": `gulp.task('nunjucks', function() {
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

`,
    "config": `njkDir: 'app/pages',
    njkPattern: '**/*.+(html|njk)',
    `,
    "options": ``,
    'watch': `    gulp.watch([config.njkDir + '/' + config.njkPattern, 'app/templates/' + config.njkPattern], ['nunjucks']);
`,
    "dependencies": `    "gulp-nunjucks-render": "^2.2.2",
`

};

let sass = {
    "imports": `const sass 				= require('gulp-sass');
    `,
    "task": `gulp.task('sass', function () {
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

`,
    "config": `sassDir: 'app/sass/**',
    sassPattern: '*.scss',
    `,
    "options": `const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
`,
    'watch': `    gulp.watch(config.sassDir + '/' + config.sassPattern, ['sass']);
`,
    "dependencies": `    "gulp-sass": "^4.0.1",
`
};

module.exports = {
    "server": {
        "imports": server.imports,
        "task": server.task,
        "config": server.config,
        "watch": server.watch,
        "options": server.options,
        "dependencies": server.dependencies
    },
    "nunjucks": {
        "imports": nunjucks.imports,
        "task": nunjucks.task,
        "config": nunjucks.config,
        "watch": nunjucks.watch,
        "options": nunjucks.options,
        "dependencies": nunjucks.dependencies

    },
    "sass": {
        "imports": sass.imports,
        "task": sass.task,
        "config": sass.config,
        "watch": sass.watch,
        "options": sass.options,
        "dependencies": sass.dependencies

    }
};