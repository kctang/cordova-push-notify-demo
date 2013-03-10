module.exports = function (grunt) {
    grunt.initConfig({
        server: {
            port: 8080,
            base: '../android/assets/www'
        },

        watch: {
            files: "www"
        }
    });

    grunt.registerTask('run', 'server watch');
}
