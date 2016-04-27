module.exports = function(grunt){
    // 构建配置任务
    grunt.initConfig({
        // 配置watch任务
        watch: {
            // 要监听的文件
            files: ["public/stylesheets/**.less","public/javascripts/**.js"],
            // 监听的文件发生变化时执行的任务
            tasks: ["less","babel"]
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
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public/javascripts',
                    src: ['**/*.js'],
                    dest: 'public/dist',
                    ext: '.js'
                }]
            }
        }

    });

    // 加载插件
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-babel');
    // 自定义任务
    grunt.registerTask("default",["watch"]);
//modules结尾 
};