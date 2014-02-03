
module.exports = function(grunt) {
  grunt.initConfig({
    // The connect task is used to serve static files with a local server.
// The watch task is used to run tasks in response to file changes
jshint:{
  all:{
      options: {
        '-W061': true,
        '-W069': true,
        '-W099': true,
        '-W014': true
      },
      src:['js/rijit/**/*.js']
    }
  },
watch: {

  client: {
    // '**' is used to include all subdirectories
    // and subdirectories of subdirectories, and so on, recursively.
    files: ['js/rijit/**/*','index.html'],
    // In our case, we don't configure any additional tasks,
    // since livereload is built into the watch task,
    // and since the browser refresh is handled by the snippet.
    // Any other tasks to run (e.g. compile CoffeeScript) go here:

    tasks:['jshint:all'],
     options: {
      livereload: true

        // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
      }


  }

},
shell: {                                // Task
        dojoBuild: {                        // Target
            options: {                        // Options
                stdout: true
            },
            command: 'js/util/buildscripts/build.sh --profile js/dojo-build.profile.js'
        }
    }
  });
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks("grunt-contrib-watch");
grunt.loadNpmTasks('grunt-shell');

grunt.registerTask('build', ['shell:dojoBuild']);

grunt.registerTask('preview', ['watch:client']);

grunt.event.on('watch', function(action, filepath, target) {
  //change the source and destination in the uglify task at run time so that it affects the changed file only
  grunt.config('jshint.all.src', [filepath]);

});

};