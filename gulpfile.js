const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const removeEmptyLines = require('gulp-remove-empty-lines');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


var config = {
	appPath: './src',
	public: './public',
	njkPages: './src/pages',
	njkTemplates: './src/templates',
	njkComponents: './src/templates/components',
	njkTemplatesWatch: './src/templates/**/*.njk',
	sassPath: './src/scss',
	cssPath: './public',
};


function errorHtml(error) {
	console.log('error Nunjucks');

	console.log(error.toString());
	console.log('File: ' + error.fileName);

	this.emit('end');
};


// NUNJUCKS
gulp.task('html', function () {
	return gulp.src(config.njkPages + '/*.njk')
		.pipe(nunjucksRender({
			path: [config.njkTemplates]
		}))
		.on('error', errorHtml)
		.pipe(removeEmptyLines())
		.pipe(gulp.dest(config.public));
});


// SASS
gulp.task('css', function () {
	return gulp.src(config.sassPath + '/styles.scss')
		.pipe(sass({ errLogToConsole: true, outputStyle: 'compact' }).on('error', sass.logError))
		.pipe(removeEmptyLines())
		.pipe(gulp.dest(config.cssPath));
});


// DEFAULT, RENDER NUNJUCKS & COMPILE SASS
gulp.task('default', gulp.series('html', 'css'));