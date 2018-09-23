# create-gulp-project

Simply create your project with gulp and add your needs (concat, minify, sass,...) via tasks.


## Installation

Make sure you have [Node.js](http://nodejs.org/) and [NPM](https://www.npmjs.com) installed.

Run `npm i -g create-gulp-project` in your terminal.



## Create project

To create a new project run `create-gulp-project` in your terminal.
The project will be set up in the working directory you currently are.

After executing the command you will be prompted with a few questions, about the directory structure and some more information if there is not already a package.json file in this folder.
When the creation is complete run `npm i` to install the dependencies.


## Config file and Modules

The config file stores the directory structure and the modules that should be used.
It is created after running `create-gulp-project`. 

You can specify the modules in this config, but it is preferred to add and remove them via `gulp add -[name]` & `gulp remove -[name]` to run init scripts provided by the modules.

If you want to add or remove more than one script, you can put them behind add leading with a hyphen: 
`gulp add -server -minify -sass`


#### Example cgpfile.json:

```json
{
  "rootDir": "./app",
  "htmlDir": "./",
  "cssDir": "./css",
  "jsDir": "./js",
  "resDir": "./res",
  "distDir": "./dist",
  "modules": [
    {
      "name": "minify",
      "options": {
        "buildTasks": [
          "css",
          "js",
          "html"
        ]
      }
    },
    {
      "name": "imagemin"
    },
    {
      "name": "autoprefixer"
    },
    {
      "name": "server",
      "options": {
        "port": 8070
      }
    },
    {
      "name": "sass",
      "options": {}
    },
    {
      "name": "nunjucks",
      "options": {}
    },
    {
      "name": "concat",
      "options": {
        "buildTasks": [
          "css",
          "js"
        ]
      }
    }
  ],
  "external": []
}
```


## Build Project

With `gulp build` you can build your project to the specified build directory (default: dist).

This build task is running the main build tasks (build-css, build-html, build-js) and maybe other tasks if the added modules specified one.
The directory names and paths in the build are the same as specified in the cgpfile.json, except for the html and resources path, which is always the root of the build directory.


#### Example directory structure:

Directory structure for the example cgpfile.json above.

```
app/
├── css
│   └── main.css
├── dist
│   ├── css
│   │   └── main.min.css
│   ├── images
│   │   └── star.svg
│   ├── index.html
│   └── js
│       └── main.min.js
├── index.html
├── js
│   └── main
│       ├── test1.ts
│       └── test2.js
├── pages
│   └── index.njk
├── res
│   └── images
│       └── star.svg
├── sass
│   └── main.scss
└── templates
    └── layout.njk
```

## Watch

If you run `gulp watch` only the underlying build tasks that are needed for the updated files are executed.

Notice that `gulp watch` does not clean the build directory, because of that you should once run `gulp build` before the build is production ready.  


## Modules

### autoprefixer
Enables css autoprefixing in the build.

### concat
Concatenates all files that are in a folder. The output file is names after the folder. 

##### Options

* order: Array of file names that should be ordered relative to the corresponding build directory.

* buildTasks: Specifies what build processes should be concatenated (Default: ["js", "css"])

##### Example:

**Directory Structure:**
```
├── dist
│   └── js
│       ├── other.js
│       └── main.js
├── js
│   ├── main
│   │    ├── test1.js
│   │    └── test2.js
│   └── other.js

```

**Options**
```json
{
  "buildTasks": ["js"],
  "order": [
    "main/test1.js",
    "main/test2.js"
  ]
}
```


### imagemin
Compresses **png**, **jpg**, **svg** and **gif** images that are in the resources folder.

### minify
Minifies the sources for the given build tasks. Adds a **.min.js** extension to the output file.

##### Options

* buildTasks: Specifies what build processes should be concatenated (Default: ["js", "css", "html"])


### nunjucks
Html template engine. For more information visit [Nunjucks](https://mozilla.github.io/nunjucks/).
The html output is going to the specified html directory that is set in cgpfile.json.
By adding the module via `gulp add -nunjucks`, the pages and template directory is created with example nunjucks files. 

##### Options

* pagesDir: The directory where the pages live (Default: "./pages")
* templateDir: The directory where the templates live (Default: "./templates")

### sass
Sass preprocessor. For more information visit [Sass](https://sass-lang.com).
The css output is going to the specifies css directory that is set in cgpfile.json.

##### Options

* sassDir: The directory where the scss files live (Default: "./sass")


### server
Development server that supports [livereload](https://www.npmjs.com/package/livereload).

##### Options

* port: Defines the port that the server is using (Default: 3500)


### babel
Compiler for Javascript. For more information visit [Babeljs](https://babeljs.io)

You can configure babel within the **.babelrc** file.


### linter
Linting for Javascript. For more information visit [JsHint](http://jshint.como)

You can configure JsHint within the **.jshintrc** file.




