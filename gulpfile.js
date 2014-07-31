var gulp = require('gulp')
		, sass = require('gulp-sass')
		, uncss = require('gulp-uncss')
		, browserSync = require('browser-sync')
		, prefix = require('gulp-autoprefixer')
		, cssshrink = require('gulp-cssshrink')
		, cmq = require('gulp-combine-media-queries')
		, uglify = require('gulp-uglifyjs')
		, glob = require('glob')

gulp.task('sass', function() {
	gulp.src('./assets/_scss/*.scss')
		.pipe(sass(
			{errLogToConsole: true}
		))
		.pipe(prefix("last 5 versions", "> 5%"))
		.pipe(gulp.dest('./assets'))
})

gulp.task('js', function() {
	gulp.src('./assets/js/_src/*.js')
		.pipe(uglify('*.min.js'))
		.pipe(gulp.dest('./assets/js'))
})

gulp.task('browser-sync', function() {
	browserSync.init(['./_site/**/*.{html,js,css}'], {
		proxy: 'mcky.dev',
		ghostMode: {
			clicks: false,
			links: false,
			forms: true,
			scroll: true
		}
	})
})

gulp.task('dist', function() {
	gulp.src('./assets/_scss/*.scss')
		.pipe(sass(
			{errLogToConsole: true}
		))
		.pipe(prefix("last 5 versions", "> 5%"))
		.pipe(cmq())

		.pipe(uncss({
			html: glob.sync('./**/*.html')
		}))
		.pipe(cssshrink())
		.pipe(gulp.dest('./assets'))
})

gulp.task('default', ['sass', 'browser-sync'], function () {
	gulp.watch('./assets/_scss/**/*.scss', ['sass'])
	// gulp.watch('./assets/js/src/*.js', ['js'])
})
