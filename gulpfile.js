var gulp = require('gulp')
		, sass = require('gulp-sass')
		, uncss = require('gulp-uncss')
		, browserSync = require('browser-sync')
		, autoprefixer = require('gulp-autoprefixer')
		, cssmin = require('gulp-cssmin')
		, cmq = require('gulp-combine-media-queries')
		, shell = require('gulp-shell')
		, reload = browserSync.reload

gulp.task('build', shell.task([ 'jekyll build' ]))

gulp.task('sass', function() {
	return gulp.src('./assets/_scss/*.scss')
		.pipe(sass({
			errLogToConsole: true
			,includePaths: require('node-neat').includePaths
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest('./assets'))
		.pipe(gulp.dest('./_site/assets'))
		.pipe(reload({stream: true}))
})


gulp.task('serve', ['build'], function() {
	browserSync({
        server: {
            baseDir: "./_site"
        }
    })

	gulp.watch('./assets/_scss/**/*.scss', ['sass'])
	gulp.watch(['./*.html', './_layouts/**/*.html', './_includes/**/*.html', './_data/*.json'], ['build'])
	gulp.watch('./_site/**/*.html').on('change', reload)
})

gulp.task('dist', ['build'], function() {
	gulp.src('./assets/_scss/*.scss')
		.pipe(sass({
			errLogToConsole: true
			,includePaths: require('node-neat').includePaths
		}))
		.pipe(autoprefixer())
		.pipe(cmq())
		.pipe(uncss({
			html: ['./_site/**/*.html']
		}))
		.pipe(cssmin())
		.pipe(gulp.dest('./_site/assets'))
})

gulp.task('default', ['serve'])

