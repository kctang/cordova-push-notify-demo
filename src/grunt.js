module.exports = function (grunt) {
    grunt.initConfig({
        server: {
            port: 8080,
            base: 'www'
//            base: '../android/assets/www'
        },

        watch: {
            files: "www"
//            files: "../android/assets/www"
        }
    });

    grunt.registerTask('run', 'server watch');
}
