
module.exports = function(grunt) {
  grunt.initConfig({
    // The connect task is used to serve static files with a local server.
// The watch task is used to run tasks in response to file changes
watch: {
  client: {
    // '**' is used to include all subdirectories
    // and subdirectories of subdirectories, and so on, recursively.
    files: ['js/rijit/**/*','index.html'],
    // In our case, we don't configure any additional tasks,
    // since livereload is built into the watch task,
    // and since the browser refresh is handled by the snippet.
    // Any other tasks to run (e.g. compile CoffeeScript) go here:

    tasks:[],
     options: {
      livereload: true

        // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
      }
    

  }
}
  });
grunt.loadNpmTasks("grunt-contrib-watch");

grunt.registerTask('preview', ['watch:client']);

};