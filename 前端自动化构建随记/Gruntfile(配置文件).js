'use strict'//声明试用ES5的严格模式

module.exports = function(grunt){//grunt的基本框架
    require('load-grunt-tasks')(grunt)//把load-grunt-tasks组件引进, grunt作为形参传入

    require('time-grunt')(grunt)//把time-grunt组件引进, grunt作为形参传入

    var config ={//配置项目路径
        app: 'app',//将源代码放到app里面
        dist: 'dist'
    }

    grunt.initConfig({//任务配置
        config: config,

        copy: {//配置copy命令, 这是一个task，不可以改名字，我们之前安装过了"npm install grunt-contrib-copy --save-dev"
            dist_html: {
                files: [
                    {
                        src: '<%= config.app %>/index.html',
                        dest: '<%= config.dist %>/index.html'
                    },
                    {
                        src: '<%= config.app %>/js/index.js',
                        dest: '<%= config.dist %>/js/index.js'
                    }
                ]
            },
        },//配置为copy之后运行grunt copy

        clean: {//我们之前安装过了"npm install grunt-contrib-clean --save-dev"
            dist: {
                src: ['<%= config.dist %>/**/*']

                //一个"*"匹配任意字符但不匹配"/"
                //"?"只匹配一个字符但不匹配"/"
                //"**"匹配任意数量的任意字符
            }
        }
    });
}
