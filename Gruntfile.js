module.exports = function(grunt) {


grunt.initConfig({
  concat: {
	    js: {
	      src: ['js/bootstrap.js', 'js/Gruntfile.js', 'js/jquery.addDot.js', 'js/jquery.js', 'js/jqueryUI.js', 'js/p5.dom.js', 'js/p5.js', 'js/sketch.js', 'tinycolor.js' ],
	      dest: 'build/built.js',
	    },
  },
});



grunt.loadNpmTasks('grunt-contrib-concat');

}