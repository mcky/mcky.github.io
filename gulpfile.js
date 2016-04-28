var gulp = require('gulp')
		, browserSync = require('browser-sync')
		, runSequence = require('run-sequence')
		, gp = require('gulp-load-plugins')()

var deploy = false

gulp.task('build', gp.shell.task([ 'jekyll build' ]))

gulp.task('styles', function() {
	return gulp.src('./assets/_scss/*.scss')
		.pipe(gp.sass({
			errLogToConsole: true
		}))
		.pipe(gp.autoprefixer())
		.pipe(gp.if(deploy, gp.cssnano()))
		.pipe(gulp.dest('./assets'))
		.pipe(gulp.dest('./_site/assets'))
		.pipe(browserSync.reload({stream: true}))
})


gulp.task('serve', ['build'], function() {
	browserSync({
        server: {
            baseDir: "./_site"
        }
    })

	gulp.watch('./assets/_scss/**/*.scss', ['styles'])
	gulp.watch(['./**/*.{html,md}', '!./_site/**/*'], ['build'])
	gulp.watch('./_site/**/*.html').on('change', browserSync.reload)
})

gulp.task('dist', function() {
	deploy = true
	runSequence(['build', 'styles'])
})

gulp.task('default', ['serve'])

