var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', function(cb) {
	global.isWatching = true
	runSequence('browserify', cb);
});
