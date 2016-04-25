module.exports = function(grunt){
    // 构建配置任务
    grunt.initConfig({
        // 配置watch任务
        watch: {
            // 要监听的文件
            files: ["public/stylesheets/**.less"],
            // 监听的文件发生变化时执行的任务
            tasks: ["less"]
        },
        less: {
            development: {
                options: {
                    // 是否压缩编译后的css
                    compress: true
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['**/*.less'],
                    dest: 'public',
                    ext: '.css'
                }]
            }
        }

    // initConfig结尾
    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    // 自定义任务
    grunt.registerTask("default",["watch"]);
//modules结尾 
};